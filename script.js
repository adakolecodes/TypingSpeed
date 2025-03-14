const testText = document.getElementById('test-text');
const inputBox = document.getElementById('input-box');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const result = document.getElementById('result');

let startTime;
let isRunning = false;
let timerInterval;
let elapsedSeconds = 0;

function startTest() {
  if (isRunning) return;
  isRunning = true;
  elapsedSeconds = 0;
  startTime = new Date().getTime();
  inputBox.value = '';
  result.textContent = '';
  inputBox.focus();
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    document.getElementById('timer').textContent = `Time: ${elapsedSeconds}s`;
  }, 1000);
}

function calculateWPM() {
  clearInterval(timerInterval);
  const endTime = new Date().getTime();
  const totalTimeInMinutes = (endTime - startTime) / 60000;
  const wordsTyped = inputBox.value.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / totalTimeInMinutes);
  result.textContent = `Your typing speed is ${wpm} WPM.`;
}

startBtn.addEventListener('click', startTest);

inputBox.addEventListener('input', () => {
  if (inputBox.value.trim() === testText.textContent) {
    calculateWPM();
    isRunning = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = 'Time: 0s';
  inputBox.value = '';
  result.textContent = '';
  isRunning = false;
});
