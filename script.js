let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 100);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    startStopButton.textContent = 'Start';
    updateDisplay();
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime + (Date.now() - startTime));
        const lapElement = document.createElement('div');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

function updateDisplay() {
    const time = isRunning ? elapsedTime + (Date.now() - startTime) : elapsedTime;
    display.textContent = formatTime(time);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}
