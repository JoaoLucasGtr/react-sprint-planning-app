const storage = new LocalStorage();

document.addEventListener('DOMContentLoaded', feedback);

function addProject() {
  let element = document.getElementById('input-projects');
  if (element.value) {
    storage.addProject(element.value);
    feedback();
    element.value = '';
  }
}

function removeProject(projectId) {
  storage.removeProject(projectId);
  feedback();
}

function addTask(id) {
  let newTask = document.getElementById(`input-task-proj-${id}`).value;
  if (newTask) {
    let newTaskPoints = document.getElementById(`input-pts-proj-${id}`).value || 0;
    storage.addTask({ projectId: id, description: newTask, points: parseInt(newTaskPoints) });
    feedback();
  }
}

function removeTask(projectId, taskId) {
  storage.removeTask(projectId, taskId);
  feedback();
}

function show(id) {
  let element = document.getElementById(id);
  element.classList.toggle("show");
}

function updatePoints(projectId, taskId, element) {
  let value = element.value ? parseInt(element.value) : 0;
  storage.updateTaskPoints(projectId, taskId, value);
  feedback();
}

function clearAll() {
  storage.clear();
  feedback();
}

function feedback() {
  let projects = storage.projects || [];
  let headerTemplate =
    `<div>
       <span class="h5 text-muted" style="cursor: pointer">Projetos: ${projects.length}</span> /
       <span class="h5 text-info" style="cursor: pointer">Pontos: ${storage.calcTotalPoints()}</span>
     </div>`
  if (projects.length > 0) {
    headerTemplate += `<button class="btn btn-outline-danger ml-auto" onclick="clearAll()">
      <i class="fa fa-trash"></i>
     </button>`;
  }

  let projectsTemplates = '';

  projects.forEach(p => {
    let tasks = p.tasks || [];
    projectsTemplates += `
      <div class="card card-body shadow">
        <button class="close ml-auto" onclick="removeProject(${p.id})">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="mb-3 d-flex align-items-center"> 
          <span class="h4 font-weight-bold">${p.name}</span>          
          <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" id="dropdownMenuButton-${p.id}" data-toggle="dropdown">
              <i class="fa fa-plus"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton-${p.id}">
              <form class="p-3" style="width : 30em">
                <label>Nova tarefa:</label>
                <input id="input-task-proj-${p.id}" placeholder="Tarefa" class="form-control" />
                <label>Pontos:</label>
                <input id="input-pts-proj-${p.id}" placeholder="Pontos" class="form-control" />
                <button onclick="addTask(${p.id})" class="btn btn-outline-primary">Add</button>
              </form>
            </div>
          </div>
          <div class="ml-auto">
            <span title="Quantidade" class="h5 text-muted" style="cursor: pointer">${tasks.length}</span> /
            <span title="Pontos" class="h5 text-info" style="cursor: pointer"> ${storage.calcPoints(p.id)}</span>
          </div>
        </div>
        <ul class="list-group mb-3">
          ${tasks.map(t =>
            `<li class="list-group-item d-flex align-items-center">${t.description}
               <button class="btn btn-link" onclick="removeTask(${p.id}, ${t.id})">
                 <i class="fa fa-minus"></i>
               </button>               
               <span class="badge badge-info badge-pill ml-auto" title="Clique para atualizar a pontuação" onclick="show('${p.id}-${t.id}-input-update-points')">
                 ${t.points}
               </span>
               <input id="${p.id}-${t.id}-input-update-points" 
                      value="0"
                      class="ml-2 form-control collapse"
                      style="width: 4em" 
                      onblur="updatePoints(${p.id}, ${t.id}, this)"></input>
             </li>`
          ).join('')}
        </ul>        
      </div>`;
  });

  document.getElementById('totals').innerHTML = headerTemplate;
  document.getElementById('projects').innerHTML = projectsTemplates;
}