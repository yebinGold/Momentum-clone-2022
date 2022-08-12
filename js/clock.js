const clock = document.querySelector("#clock");

const pad = (num) => {
    return String(num).padStart(2, '0'); // 두 자릿수 -> 0으로 채우기
}

const getClock = () => {
    const date = new Date();
    clock.innerText = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

getClock();
setInterval(getClock, 1000); 