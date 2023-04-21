"use strict";

const TODOKEY = "TODO_ARRAY";
const KEYLOGIN = "USER_ACTIVE";

const modalContainer = document.getElementById("login-modal");
const todoContainer = document.getElementById("todo-container");
const taskInput = document.getElementById("input-task");
const btnAddTask = document.getElementById("btn-add");
const btnDeleteTask = document.querySelector(".close");
const todoListEl = document.getElementById("todo-list");

//Clear input form
const clearTaskInput = () => {
  taskInput.value = "";
};

let currentAccount;
if (getFromStorage(KEYLOGIN))
  currentAccount = parseUser(JSON.parse(getFromStorage(KEYLOGIN)));

const todoArrObj = JSON.parse(getFromStorage(TODOKEY)) || [];
//convert array from localStorage to Instance array
let todoArr = [];
if (getFromStorage(TODOKEY))
  todoArr = JSON.parse(getFromStorage(TODOKEY)).map((todo) => parseTask(todo));

if (currentAccount) {
  modalContainer.style.display = "none";
} else todoContainer.style.display = "none";

let currentTodoArr;

//Render tasks
function renderTaskList(todoArr) {
  todoListEl.innerHTML = "";
  currentTodoArr = todoArr.filter(
    (arr) => arr.owner === currentAccount.username
  );
  for (let i = 0; i < currentTodoArr.length; i++) {
    const li = document.createElement("li");
    li.classList.add(`task-${i}`);
    li.setAttribute(
      "onclick",
      `editTask(${i},'${currentTodoArr[i].task}','${currentTodoArr[i].date}')`
    );
    li.innerHTML = `${currentTodoArr[i].task}<span class="close" onclick="deleteTask(${i})">×</span>`;
    todoListEl.appendChild(li);
    if (currentTodoArr[i].isDone) {
      document.querySelector(`.task-${i}`).classList.add("checked");
    } else {
      document.querySelector(`.task-${i}`).classList.remove("checked");
    }
  }
}
renderTaskList(todoArr);

//Edit task
const editTask = (i, task, date) => {
  function checkValue(x) {
    if (
      x.task !== currentTodoArr[i].task ||
      x.owner !== currentTodoArr[i].owner ||
      x.date !== currentTodoArr[i].date
    ) {
      return false;
    }
    return true;
  }
  if (
    currentTodoArr[i] &&
    currentTodoArr[i].task === task &&
    currentTodoArr[i].date == date
  ) {
    currentTodoArr[i].isDone = !currentTodoArr[i].isDone;
    // console.log(todoArr.findIndex(checkValue));
    todoArr[todoArr.findIndex(checkValue)].isDone = currentTodoArr[i].isDone;
    saveToStorage(TODOKEY, JSON.stringify(todoArr));
    renderTaskList(todoArr);
  }
};

//Delete task
const deleteTask = (i) => {
  function checkValue(x) {
    if (
      x.task !== currentTodoArr[i].task ||
      x.owner !== currentTodoArr[i].owner
    ) {
      return false;
    }
    return true;
  }
  todoArr.splice(todoArr.findIndex(checkValue), 1);
  currentTodoArr.splice(i, 1);

  saveToStorage(TODOKEY, JSON.stringify(todoArr));
  renderTaskList(todoArr);
};

//event function for adding new task and store in localStorage
btnAddTask.addEventListener("click", function (e) {
  //Collect data from the input forms
  const taskData = {
    task: taskInput.value,
    owner: currentAccount.username,
    isDone: false,
    date: new Date(),
  };

  //Check input field
  function validateData() {
    //check task input
    if (taskInput.value === "") {
      alert("Please input for the task");
      return false;
    }
    if (currentTodoArr) {
      for (let i = 0; i < currentTodoArr.length; i++) {
        //to avoid user make same task in the same time
        if (
          currentTodoArr[i].task === taskInput.value &&
          currentTodoArr[i].date.toISOString().substring(0, 19) ===
            taskData.date.toISOString().substring(0, 19)
        ) {
          alert("You have duplicated the same task in the same time!");
          return false;
        }
      }
    }
    return true;
  }
  //validate data and store
  const validate = validateData();
  if (validate) {
    todoArr.push(parseTask(taskData));
    currentTodoArr = todoArr.filter(
      (arr) => arr.owner === currentAccount.username
    );
    renderTaskList(todoArr);
    saveToStorage(TODOKEY, JSON.stringify(todoArr));
    clearTaskInput();
  }
});
