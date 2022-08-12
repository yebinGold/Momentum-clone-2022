const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const logoutButton = document.querySelector("#log-out");

/*
same as
const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");
*/

const greeting = document.getElementById("greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username" // 오타 방지

function onLoginSubmit(event) {
  event.preventDefault(); // submit 이벤트로 인한 새로고침 방지
  //console.log(event); // 발생한 이벤트에 대한 정보 출력
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value; // 입력값 저장
  loginInput.value = null; // 인풋 초기화
  localStorage.setItem(USERNAME_KEY, username);

  paintGreetings(username);
}
loginForm.addEventListener("submit", onLoginSubmit); 

function paintGreetings(username){
  greeting.classList.remove(HIDDEN_CLASSNAME);
  logoutButton.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello, ${username}`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){
  // show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
} else{
  // show the greeting
  paintGreetings(savedUsername);
}

const logout = () => {
  localStorage.removeItem(USERNAME_KEY);
  greeting.classList.add(HIDDEN_CLASSNAME);
  logoutButton.classList.add(HIDDEN_CLASSNAME);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
}
logoutButton.addEventListener('click', logout);