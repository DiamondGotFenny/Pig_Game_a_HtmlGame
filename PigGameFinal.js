/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- Enter a winning score in the input field before first rolling in a game.
- The first player to reach winning score on GLOBAL score wins the game
- A player looses the ENTIRE game when he rolls two 6 in a row.  
*/

var scores, roundScore, activePlayer, gamePlaying,
    prevDice, winCondition, input, isInputValid;

var dicDOM = document.querySelector(".dice");
var dic2DOM = document.querySelector(".dice2");

inital();


//event handler for rolling button;
document.querySelector(".btn-roll").addEventListener('click', function () {
    CheckInputValid();
    if (gamePlaying&&isInputValid) {
        //ramdom the number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        console.log(dice + '  '+dice2+'  ' + activePlayer);
        //2.Display the result;

        dicDOM.style.display = "block";
        dic2DOM.style.display = "block";
        dicDOM.src = "dice-" + dice + ".png";
        dic2DOM.src = "dice-" + dice2 + ".png";


        //3. update the round score IF the rolled result is not 1;
        if (dice !== 1 && dice2 !== 1) {
            roundScore += dice+dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

            //check if any dice equal to 6
            if (dice === 6) {
                //we always check if the prevDice value=6 first
                //because its initial value is 0, so its value will be 6 at least at second dice
                if (prevDice === 6) {
                    LostGame();
                }
                //if first dice =6, we store the value to preDice
                prevDice = 6;
            } else {
                //if dice is not equal to 6, we set the preDice to 0
                //no matter what value of the last dice is.
                prevDice = 0;
            }
        } else {
            NextPlayer();
        }
    }
});

//event handler for Hold button;
document.querySelector(".btn-hold").addEventListener('click', function () {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the relative UI
        document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];

        //check if the player won the game
        if (scores[activePlayer] >= winCondition) {
            document.querySelector('#name-' + activePlayer).innerHTML = "WINNER!";
            dicDOM.style.display = "none";
            dic2DOM.style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active');
            gamePlaying = false;
            isInputValid = false;
            console.log(gamePlaying + ' ' + isInputValid + ' inwingame');
        } else {
            NextPlayer();
        }
    }
});

//event handler for NewGame button
document.querySelector(".btn-new").addEventListener('click', inital);

//switch to next player
function NextPlayer() {
    roundScore = 0;

    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    dicDOM.style.display = "none";
    dic2DOM.style.display = "none";
}

//set the game to initial status
function inital() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;
    prevDice = 0;

    dicDOM.style.display = "none";
    dic2DOM.style.display = "none";

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function LostGame() {
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('#name-' + activePlayer).innerHTML = "WINNER!";
    dicDOM.style.display = "none";
    dic2DOM.style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    gamePlaying = false;
    isInputValid = false;
}

function CheckInputValid() {
    input = document.getElementById("winInput").value;
    //undefine, '',0 , null is COERCED to false;
    //if the input's type is not number we need to use isNaN to check if input is string
    if (input && input >= 10 && input <= 999) {
        isInputValid = true;
        winCondition = input;
    } else {
        alert('Please Enter Valid Number');
        isInputValid = false;
    }
}        