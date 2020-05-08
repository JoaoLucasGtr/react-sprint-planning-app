class Storage {
  key = "str-prjs-react-tst";
  _projetos = [];

  constructor() {
    let json = localStorage.getItem(this.key);
    this._projetos = json ? JSON.parse(json) : [];
  }

  get projetos() {
    return this._projetos;
  }

  save() {
    let json = JSON.stringify(this.projetos);
    localStorage.setItem(this.key, json);
  }

  getProjeto(nome) {
    return this.projetos.find(p => p.nome === nome);
  }

  addProjeto(nome) {
    let id = this.projetos.length + 1;
    this.projetos.push({ id, nome, tarefas: [] });
    this.save();
  }

  getTarefas(projetoNome) {
    return this.projetos.find(p => p.nome === projetoNome).tarefas;
  }

  addTarefa({ projetoNome, descricao, pontos }) {
    let tarefas = this.getTarefas(projetoNome);
    let id = tarefas.length + 1;
    tarefas.push({ id, descricao, pontos: pontos || 0 });
    this.save();
  }

  calcularPontuacao(projetoNome) {
    let tarefas = this.getTarefas(projetoNome);
    return tarefas.reduce((prev, curr) => prev + curr.pontos, 0);
  }
}

const instancia = new Storage();
export default instancia; //Singleton pattern
