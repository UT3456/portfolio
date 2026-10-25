let tokens = 5;
const budget = document.querySelector('#budget');
const result = document.querySelector('#result');
document.querySelector('#request').addEventListener('click', () => {
  if (tokens > 0) {
    tokens -= 1;
    result.textContent = 'Simulated 200 OK: request accepted.';
  } else {
    result.textContent = 'Simulated 429: request rejected. Refill the budget to retry.';
  }
  budget.textContent = `${tokens} / 5`;
});
document.querySelector('#refill').addEventListener('click', () => {
  tokens = 5;
  budget.textContent = '5 / 5';
  result.textContent = 'Budget refilled. Five tokens available.';
});
