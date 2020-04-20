/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
FIRST DOM: 

- Create the fundamental game variables
- Generate a random number
- Manipulate the DOM and read from the DOM
- Change CSS style
*/

var scores, roundScore, activePlayer, gamePlaying;
var maxScore;

init()

/*
EVENTS HANDLING

- Callback function
- Anonymous function
- Another way to select elements by ID
- Change the image in <img> element
*/

// This is a callback function which is not suitable in this case
// function btn()
// {

// }
// btn();

document.querySelector('.btn-roll').addEventListener('click', function()
{
    if (!gamePlaying)
        return;

    // 1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    var diceDOM1 = document.getElementById('dice-1');
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM1.style.display = 'block';

    var diceDOM2 = document.getElementById('dice-2');
    diceDOM2.src = 'dice-' + dice2 + '.png';
    diceDOM2.style.display = 'block';

    // 3. Update the round score if the rolled unmber was NOT a 1
    if (dice1 !== 1 && dice2 !== 1)
    {
        // Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else
    {
       nextPlayer();
    }
});


document.querySelector('.btn-hold').addEventListener('click', function()
{
    if (!gamePlaying)
        return;
        
    // Add CURRENT score to GLOBAL socre
    scores[activePlayer] += roundScore;
    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    // Check if player won the game
    if (scores[activePlayer] >= maxScore)
    {
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gamePlaying = false;
    }
    else{
        nextPlayer();
    }
})

document.querySelector('#btn-submit-score').addEventListener('click', function(){
    var newMaxScore = document.getElementById('max-score').value;
    maxScore = newMaxScore;    
})


function nextPlayer()
{
    // Next player
    activePlayer = 1 - activePlayer;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Change active interface (red dot)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active')

    // Hide dice 
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init()
{
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    maxScore = document.getElementById('max-score').value;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    // Get element by id
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);