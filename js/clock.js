const clock = document.querySelector("#clock");
const dateSpan = document.querySelector('#date');
const date = new Date();

const pad = (num) => {
    return String(num).padStart(2, '0'); // 두 자릿수 -> 0으로 채우기
}

const getClock = () => {
    clock.innerText = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

getClock();
setInterval(getClock, 1000); 


// 날짜 추가
const getDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const nowdate = date.getDate();
    dateSpan.innerText = `${pad(year)}-${pad(month+1)}-${pad(nowdate)}`;
}
getDate();