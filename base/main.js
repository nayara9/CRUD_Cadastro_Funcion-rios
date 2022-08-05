let employees = [];
let roles = [];
let selectedItem;
const listEl = document.querySelector("ul")
const formEl = document.querySelector("form")
const bdelete = document.getElementById("bdelete")
const bcancel = document.getElementById("bcancel")
const bsubmit = document.getElementById("bsubmit")


async function init() {
  try {
    [employees, roles] = await Promise.all([
      listEmployees(),
      listRoles()]);
    renderRoles()
    renderData();
    clearSelection();
    bcancel.addEventListener("click",clearSelection)
    
    
  } catch (erro) {
    showError(erro);
  }
}
init();

function selectItem(employee, li) {
  clearSelection();
  selectedItem = employee;
  li.classList.add("selected");
  formEl.name.value = employee.name;
  formEl.salary.valueAsNumber = employee.salary;
  formEl.role_id.value = employee.rode_id;
  bdelete.style.display = "inline";
  bcancel.style.display = "inline";


}

function clearSelection() {
  selectedItem = undefined;
  const li = listEl.querySelector(".selected")

  if (li) {
    li.classList.remove("selected");
  }
  formEl.name.value = "";
  formEl.salary.value = "";
  formEl.role_id.value = "";
  bdelete.style.display = "none";
  bcancel.style.display = "none"
}

function renderData() {

  for(const employee of employees) {
    let role = roles.find((role) => role.id == employee.role_id);
    const li = document.createElement("li");
    const divName = document.createElement("div");
    divName.textContent = employee.name;
    const divRole = document.createElement("div");
    divRole.textContent = role.name;
    li.appendChild(divName);
    li.appendChild(divRole);
    listEl.appendChild(li);
    li.addEventListener("click", () => selectItem(employee, li));
  }
}

function renderRoles() {

  for(const role of roles) {
    const option = document.createElement("option");
    option.textContent = role.name;
    option.value = role.id;
    formEl.role_id.appendChild(option);
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
