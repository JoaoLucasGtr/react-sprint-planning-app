import React, { Component } from "react";
import { render } from "react-dom";
import data from './storage.js'

export default class Projeto extends Component {
  constructor({ nome }) {
    super();    
    let projeto = data.getProjeto(nome);
    let tarefas = projeto.tarefas;    
    this.state = {
      projeto,
      nome,
      tarefas,
      pontuacao: this.calcularPontuacao(tarefas),
      input: "",
      pontosInput: ""
    };
  }

  calcularPontuacao = (tarefas) => {
    return tarefas.reduce((prev, curr) => prev + curr.pontos, 0);
  };

  textChanged = e => {
    this.setState({ input: e.target.value });
  };

  pontosChanged = e => {
    let pontosInput = isNaN(e.target.value) ? 0 : parseInt(e.target.value);
    this.setState({ pontosInput });
  };

  add = () => {
    let projetoNome = this.state.projeto.nome;
    data.addTarefa({
      projetoNome,
      descricao: this.state.input,
      pontos: this.state.pontosInput
    });
    
    let tarefas = data.getTarefas(projetoNome);
    let pontuacao = this.calcularPontuacao(tarefas);
    this.setState({ tarefas, pontuacao, input: "", pontosInput: "" });
  };

  render() {
    return (
      <div className="proj">
        <h2>Projeto: {this.state.nome}</h2>
        <p>
          Atividades: {this.state.tarefas.length}, Pontuação: {this.state.pontuacao}
        </p>
        <input
          placeholder="Tarefa"
          value={this.state.input}
          onChange={this.textChanged}
        />
        <input
          placeholder="Pontos"
          value={this.state.pontosInput}
          onChange={this.pontosChanged}
        />
        <button onClick={this.add}>Add</button>
        <ul>
          {this.state.tarefas.map(t => (
            <li key={t.id}>
              Tarefa {t.id} :: {t.descricao}, {t.pontos}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
