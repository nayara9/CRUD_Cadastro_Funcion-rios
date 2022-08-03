let employees = [];
let roles = [];
const listEl = document.querySelector("ul")
const formEl = document.querySelector("form")

async function init() {
  try {
    [employees, roles] = await Promise.all([
      listEmployees(),
      listRoles(),
    ]);
    renderData();
  } catch (erro) {
    showError(erro);
  }
}
init();

function renderData() {

  for(const employee of employees) {
    let role = roles.find((role) => role.id == employee.role_id);

    const li = document.createElement("li");
    const divName = document.createElement("div");
    divName.textContent = employee.name;
    const divRole = document.createElement("div");
    divRole.textContent = employee.name;
    li.appendChild(divName);
    li.appendChild(divRole);
    listEl.appendChild(li);
  }
}

function showError(error) {
  document.getElementById("errors").textContent = "Erro ao carregar dados.";
  console.error(error);
}

/*
// Criar
fetch(`http://localhost:3000/employees`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(employee),
});

// Atualizar
fetch(`http://localhost:3000/employees/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(employee),
});

// Excluir
fetch(`http://localhost:3000/employees/${id}`, {
  method: "DELETE",
});
*/
