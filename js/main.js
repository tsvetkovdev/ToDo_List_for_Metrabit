let addTaskBtn = document.getElementById("add");
let addTaskIcon = document.getElementById("addInTitle");
let todo = document.getElementById("todo");
let scope = document.getElementById("scope");
let countActive = document.getElementById("active");
let successful = document.getElementById("successful");

let tasks = [];

let enableToAdd = false;

if (localStorage.getItem("todo")) {
  tasks = JSON.parse(localStorage.getItem("todo"));
  displayTask();
}

function Task() {
  (this.name = ""),
    (this.active = false),
    (this.date = ""),
    (this.height = "26px");
}

function addNewTask() {
  tasks.push(new Task());
  localStorage.setItem("todo", JSON.stringify(tasks));
  displayTask();
}

addTaskIcon.addEventListener("click", () => addNewTask());

addTaskBtn.addEventListener("click", () => addNewTask());

function deleteTask(i) {
  tasks.splice(i, 1);
  displayTask();
  localStorage.setItem("todo", JSON.stringify(tasks));
}

function addName(i) {
  let rightCheck = document.body.querySelectorAll(`input[class="rightCheck"]`);
  let leftCheck = document.body.querySelectorAll(`input[class="leftCheck"]`);
  let buttons = document.body.querySelectorAll('button[class="buttonDelete"]');
  let input = document.getElementById(`item_${i}`);
  let item = document.getElementById(`task=${i}`);
  if (enableToAdd === true) {
    tasks[i].name = input.value;
    item.style.cssText = "border-bottom: 1px solid #C7C7C7";
    input.blur();
    input.setAttribute("disabled", "true");
    localStorage.setItem("todo", JSON.stringify(tasks));
    for (let k = 0; k < rightCheck.length; k++) {
      rightCheck[k].removeAttribute("disabled");
      buttons[k].removeAttribute("disabled");
      leftCheck[k].removeAttribute("disabled");
    }
    enableToAdd = false;
  } else if (enableToAdd === false) {
    input.removeAttribute("disabled");
    input.focus();
    item.style.cssText = "border-bottom: 1px solid #889DEA";
    rightCheck.disabled;
    localStorage.setItem("todo", JSON.stringify(tasks));
    enableToAdd = true;
    for (let k = 0; k < rightCheck.length; k++) {
      buttons[k].setAttribute("disabled", "true");
      rightCheck[k].setAttribute("disabled", "true");
      leftCheck[k].setAttribute("disabled", "true");
      rightCheck[i].removeAttribute("disabled");
    }
  }
}

function activateTask(i) {
  tasks[i].active = !tasks[i].active;
  displayTask();
  localStorage.setItem("todo", JSON.stringify(tasks));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//autoResizing textarea

function autoGrow(element, i) {
  element.style.height = "26px";
  element.style.height = element.scrollHeight + "px";
  tasks[i].height = element.scrollHeight + "px";
  localStorage.setItem("todo", JSON.stringify(tasks));
}

//////////////////////////////////////////////////////////////////////////////////////////////

function displayTask() {
  let displayTask = "";
  if (tasks.length === 0) todo.innerHTML = "Add a new tasks";
  tasks.forEach((item, i) => {
    let now = new Date()
    monthA = "Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec".split(",");
    item.date = `${now.getDate()} ${monthA[now.getMonth()]} ${now.getFullYear()}`;

    displayTask += `
    
    <li class="task" id='task=${i}'>
    <div class="taskMenu">
    <div class="leftSide">
    <input type='checkbox' id='leftCheck_${i}' class='leftCheck' onChange="activateTask(${i})" ${
      item.active ? "checked" : null
    }> 
    <label for='leftCheck_${i}'></label>
    <p>${item.date}</p>
    </div>
    <div class="rightSide">
    <input type='checkbox' class='rightCheck' id='rightCheck_${i}' onChange="addName(${i})">
    <label for='rightCheck_${i}'></label>
    <button id='${i}' class='buttonDelete' onClick="deleteTask(${i})"></button>
    </div>
    </div>
    <div class="taskInput">
    <textarea class='txta' id='item_${i}' onkeypress="autoGrow(this, ${i})" onkeyup="autoGrow(this, ${i})" ${
      item.active
        ? `style="color: #BBBBBB; text-decoration-line: line-through; height: ${item.height}"`
        : `style="height: ${item.height}"`
    } disabled >${item.name}</textarea>
    </div>
    </li>
    `;

    todo.innerHTML = displayTask;
  });
  scope.innerHTML = `${tasks.length}`;
  countActive.innerHTML = `${
    tasks.length -
    tasks.reduce(
      (total, currentValue) =>
        currentValue.active === true ? total + 1 : total,
      0
    )
  }`;
  successful.innerHTML = `${tasks.reduce(
    (total, currentValue) => (currentValue.active === true ? total + 1 : total),
    0
  )}`;
}

//////////////////////
