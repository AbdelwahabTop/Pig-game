'use strict';

// Selecting Elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--0');
const palyer0El = document.querySelector('.player--0');
const palyer1El = document.querySelector('.player--1');

let currentScore, activePlayer, scores, playing;

// Starting conditions
const init = function () {
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;

    diceEl.classList.add('hidden');
    palyer0El.classList.add('player--active');
    palyer0El.classList.remove('player--winner');
    palyer1El.classList.remove('player--active');
    palyer1El.classList.remove('player--winner');
}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    palyer0El.classList.toggle('player--active');
    palyer1El.classList.toggle('player--active');
}
// ---------------------------------------------------
// Rolling dice 
btnRoll.addEventListener('click', function () {
    if(playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) +1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next palyer
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch to current score
            switchPlayer();
        }
    }
})
// -------------------------------------------------
btnHold.addEventListener('click', function () {
    if(playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;  
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            playing = false;
        } 
        else {
            // Switch to the next  
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);