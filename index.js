import React, { Component } from "react";
import { render } from "react-dom";
import Projeto from "./Projeto";
import "./style.css";
import data from "./storage.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projetos: data.projetos,
      input: ""
    };
  }

  changed = e => {
    this.setState({ input: e.target.value });
  };

  add = () => {
    data.addProjeto(this.state.input);

    let projetos = data.projetos;
    this.setState({ projetos, input: "" });
  };

  render() {
    return (
      <div>
        <p>Projetos: {this.state.projetos.length}</p>
        <input
          placeholder="incluir projeto"
          value={this.state.input}
          onChange={this.changed}
        />
        <button onClick={this.add}>Add</button>
        <hr />
        {this.state.projetos.map(p => (
          <Projeto key={p.id} nome={p.nome} />
        ))}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
