/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, diceDOM0, diceDOM1, gameState, lastDice0, lastDice1, winningScore;

//Initialize Game var with init function here
init();


//document.querySelector('.dice').style.display = 'none';

//document.querySelector('#current-' + activePlayer).textContent = dice;

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gameState){
		//1. Get Random number
		var dice0 = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		//2. Display dice base on dice number
		diceDOM0.style.display = 'block';
		diceDOM1.style.display = 'block';

		diceDOM0.src = 'dice-' + dice0 + '.png';
		diceDOM1.src = 'dice-' + dice1 + '.png';

		//3. Add to Round Score if player click is not hit 1

		if ( dice0 !== 1 && dice1 !== 1){
			roundScore += dice0 + dice1;
			document.getElementById('current-' + activePlayer).textContent = roundScore;

		} else {
			nextPlayer();
		}
		/*if ( (dice0 === 6 || dice1 === 6) && (lastDice0 === 6 || lastDice1 === 6) ) {
			console.log(dice0, dice1, activePlayer);
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer ).textContent = '0';
			nextPlayer();
		}
		else if (dice0 !== 1 && dice1 !== 1){
			console.log(dice0,dice1, activePlayer);
			var totalDice = dice0 + dice1;
			roundScore += totalDice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;

			lastDice0 = dice0;
			lastDice1 = dice1;
			
		} else {
			console.log(dice0,dice1, activePlayer);
			nextPlayer();
		}*/


	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gameState){
		//1. Update Player Score
		scores[activePlayer] += roundScore;
		//2. Display Player Score
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		//3. Checking Winner
		var input = document.querySelector('.txt-win-score').value;
		winningScore = input;

		if (scores[activePlayer] >= winningScore){
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

document.querySelector('.txt-win-score').addEventListener('change', function(){
	gameState = true;

	document.querySelector('.txt-win-score').disabled = true;
});

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	diceDOM0.style.display = 'none';
	diceDOM1.style.display = 'none';
	document.getElementById('current-0').textContent = roundScore;
	document.getElementById('current-1').textContent = roundScore;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gameState = false;
	diceDOM0 = document.getElementById('dice-0');
	diceDOM1 = document.getElementById('dice-1');
	diceDOM0.style.display = 'none';
	diceDOM1.style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	//document.querySelector('.dice').style.display = 'none';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.txt-win-score').disabled = false;
	document.querySelector('.txt-win-score').value = '';
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

