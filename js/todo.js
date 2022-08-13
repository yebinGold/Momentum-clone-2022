const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");
const progress = document.querySelector('#percent');

const TODOS_KEY = "todos";

let todos = [];


// todos list
function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function removeTodo(e) {
  const li = e.target.parentElement;

  todos = JSON.parse(localStorage.getItem(TODOS_KEY));
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
  countDone();

  li.remove();
}

function checkTodo(e){
  const li = e.target.parentElement;
  li.children[0].classList.toggle("check");

  todos = JSON.parse(localStorage.getItem(TODOS_KEY));
  todos = todos.map(todo => {
    if(todo.id === parseInt(li.id)){
      const temp = todo.checked;
      todo.checked = !temp;
    }
    return todo;
  })
  saveTodo();
  countDone();
}

function paintTodo(todo) {
  const todoLi = document.createElement("li");
  todoLi.id = todo.id;

  const span = document.createElement("span");
  const chx = document.createElement("button");
  const btn = document.createElement("button");

  span.innerText = todo.text;
  chx.innerText = '✔️';
  btn.innerText = "❌";
  chx.addEventListener("click", checkTodo);
  btn.addEventListener("click", removeTodo);

  if(todo.checked){
    span.classList.add("check");
  }


  todoLi.appendChild(span);
  todoLi.appendChild(chx);
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
    checked: false,
  };

  todoInput.value = "";

  todos.push(todoObj);
  paintTodo(todoObj);
  saveTodo();
  countDone();
}


// 이벤트 핸들러 추가
todoForm.addEventListener("submit", handleTodoSubmit);


// 화면 렌더링
const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  // not null
  const parsedTodos = JSON.parse(savedTodos);
  parsedTodos.forEach((item) => {
    paintTodo(item);
  });
  countDone();
}


function countDone(){
  const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
  const len = todos.length;
  const done = todos.filter(todo => todo.checked === true).length;
  progress.innerText = parseInt(done / len * 100) + '%'
}