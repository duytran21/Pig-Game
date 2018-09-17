/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, diceDOM, gameState;

//Initialize Game var with init function here
init();


//document.querySelector('.dice').style.display = 'none';

//document.querySelector('#current-' + activePlayer).textContent = dice;

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gameState){
		//1. Get Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		//2. Display dice base on dice number
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//3. Add to Round Score if player click is not hit 1
		if (dice !== 1){
			roundScore += dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
			
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gameState){
		//1. Update Player Score
		scores[activePlayer] += roundScore;

		//2. Display Player Score
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		//3. Checking Winner
		if (scores[activePlayer] >= 20){
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			gameState = false;
		} else {
		//4. Next player's turn
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	diceDOM.style.display = 'none';
	document.getElementById('current-0').textContent = roundScore;
	document.getElementById('current-1').textContent = roundScore;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gameState = true;
	diceDOM = document.querySelector('.dice');
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
}

