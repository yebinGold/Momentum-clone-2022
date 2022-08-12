const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");
const doneList = document.querySelector("#done-list");
const clearBtn = document.querySelector("#clearBtn");

const TODOS_KEY = "todos";

let todos = [];
let doneTodos = [];


// todos list
function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(e) {
  const li = e.target.parentElement;

  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();

  li.remove();

  saveDone(li.id, li.children[1].innerText);
}

function paintTodo(todo) {
  const todoLi = document.createElement("li");
  todoLi.id = todo.id;
//   const chx = document.createElement("input");
//   chx.type = 'checkbox';
  const span = document.createElement("span");
  const btn = document.createElement("button");

  span.innerText = todo.text;
  btn.innerText = "❌";
  btn.addEventListener("click", removeTodo);

  //todoLi.appendChild(chx);
  todoLi.appendChild(span);
  todoLi.appendChild(btn);
  todoList.appendChild(todoLi);
}

function handleTodoSubmit(e) {
  e.preventDefault();
  const todo = todoInput.value;
  const randomId = Date.now();
  const todoObj = {
    text: todo,
    id: randomId,
  };

  todoInput.value = "";

  todos.push(todoObj);
  paintTodo(todoObj);
  saveTodo();
}


// done todos list
function saveDone(id, text) {
  const done = {
    id: id,
    text: text,
  };
  doneTodos.push(done);
  localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
  paintDone(done);
}
function paintDone(item) {
  const doneLi = document.createElement("li");
  doneLi.id = item.id;
  const span = document.createElement("span");
  span.innerText = item.text;

  doneLi.appendChild(span);
  doneList.appendChild(doneLi);
}
function clearDone() {
  localStorage.setItem("doneTodos", JSON.stringify([]));
  while (doneList.hasChildNodes()) {
    doneList.removeChild(doneList.firstChild);
  }
}


// 이벤트 핸들러 추가
todoForm.addEventListener("submit", handleTodoSubmit);
clearBtn.addEventListener("click", clearDone);


// 화면 렌더링
const savedTodos = localStorage.getItem("todos");

if (savedTodos) {
  // not null
  const parsedTodos = JSON.parse(savedTodos);
  parsedTodos.forEach((item) => {
    paintTodo(item);
  });
}

const savedDone = localStorage.getItem("doneTodos");
if (savedDone) {
  const parsedDone = JSON.parse(localStorage.getItem("doneTodos"));
  parsedDone.forEach((item) => paintDone(item));
}