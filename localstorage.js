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

  clear() {
    this._projects = [];
    this.save();
  }

  save() {
    let json = JSON.stringify(this.projects);
    localStorage.setItem(this.key, json);
  }

  getProject(name) {
    return this.projects.find(p => p.name === name);
  }

  addProject(name) {
    let maxId = this.projects.length > 0
      ? this.projects.reduce((prev, current) => (prev.id > current.id) ? prev : current)
      : { id: 0 };

    this.projects.push({ id: maxId.id + 1, name, tasks: [] });
    this.save();
  }

  getTasks(projectId) {
    let project = this.projects.find(p => p.id === projectId);
    return project ? project.tasks : [];
  }

  addTask({ projectId, description, points }) {
    let tasks = this.getTasks(projectId);
    let maxId = tasks.length > 0 ? tasks.reduce((prev, current) => (prev.id > current.id) ? prev : current) : { id: 0 };
    tasks.push({ id: maxId.id + 1, description, points: parseInt(points) || 0 });
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

  updateTaskPoints(projectId, taskId, points) {
    let tasks = this.getTasks(projectId);
    let task = tasks.find(t => t.id === taskId);
    task.points = points;
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