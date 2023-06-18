'use strict';

//Selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Starting condtions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    //Generate random dice role
    const dice = Math.ceil(6 * Math.random());

    //display dice img and add to current score
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for 1: if true,switch to player1/0
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Holding the score
holdBtn.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    if (totalScores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner', 'name');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//Resetting the game
newBtn.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner', 'name');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  playing = true;
});
