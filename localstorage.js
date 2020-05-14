class LocalStorage {
  key = "sprint-planning-web-app";
  _projects = [];

  constructor() {
    let json = localStorage.getItem(this.key);
    this._projects = json ? JSON.parse(json) : [];
  }

  get projects() {
    return this._projects;
  }

  save() {
    let json = JSON.stringify(this.projects);
    localStorage.setItem(this.key, json);
  }

  getProject(name) {
    return this.projects.find(p => p.name === name);
  }

  addProject(name) {
    let id = this.projects.length + 1;
    this.projects.push({ id, name, tasks: [] });
    this.save();
  }

  getTasks(projectId) {
    let project = this.projects.find(p => p.id === projectId);
    return project ? project.tasks : [];
  }

  addTask({ projectId, description, points }) {
    let tasks = this.getTasks(projectId);
    let id = tasks.length + 1;
    tasks.push({ id, description, points: parseInt(points) || 0 });
    this.save();
  }

  removeProject(projectId) {
    let projId = this.projects.findIndex(p => p.id === projectId);
    this.projects.splice(projId, 1);
    this.save();
  }

  removeTask(projectId, taskId) {
    let tasks = this.getTasks(projectId);
    let taskIndex = tasks.findIndex(t => t.id === taskId);
    tasks.splice(taskIndex, 1);
    this.save();
  }

  calcPoints(id) {
    let tasks = this.getTasks(id);
    let pts = tasks.reduce((prev, curr) => parseInt(prev) + parseInt(curr.points), 0);
    return pts || 0;
  }

  calcTotalPoints() {
    let totalPoints = 0;
    this.projects.forEach(p => totalPoints += this.calcPoints(p.id));
    return totalPoints || 0;
  }
}