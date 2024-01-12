'use strict';

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');

const dice = document.querySelector('.dice');

const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let currScore0 = document.querySelector('#current--0');
let currScore1 = document.querySelector('#current--1');

const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');

let scores, activePlayer, playing, currScore;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  currScore = 0;

  currScore0.textContent = 0;
  currScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  dice.classList.add('hidden');
  activePlayer0.classList.remove('player--winner');
  activePlayer1.classList.remove('player--winner');
  activePlayer0.classList.add('player--active');
  activePlayer1.classList.remove('player--active');
};
init();

let changePlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0.classList.toggle('player--active');
  activePlayer1.classList.toggle('player--active');
};

btnRollDice.addEventListener('click', function () {
  if (playing) {
    dice.classList.remove('hidden');
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScore;
    } else {
      changePlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      changePlayer();
    }
    changePlayer();
  }
});
btnNew.addEventListener('click', init);
