/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 in any dice, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Players can even decide a score to win in the input field.

*/

var activePlayer, roundScore, scores, gamePlaying;

init();

var lastDice;

//document.querySelector('player-0-panel').remove

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		//1.Initializing the random dice variable
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//2. Display the random dice number pic
		document.getElementById('dice1').style.display = 'block';
		document.getElementById('dice2').style.display = 'block';
		
		document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice2').src = 'dice-' + dice2 + '.png';

		if(dice1!==1 && dice2!==1){
			roundScore+=dice1 + dice2;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}

		//3.Calulate the roundscore and if two consicutive 6 appear then palyer will lose global score and miss chance
		/*
		if(dice===6 && lastDice ===6){
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice!==1) {

			roundScore += dice;
			document.getElementById('current-' + activePlayer).innerHTML = roundScore;
		}else {
			//nextPlayer
			nextPlayer();
		}

		lastDice = dice;
		*/
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
		//1.add current to global score
		scores[activePlayer] += roundScore;

		//2.Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		document.getElementById('current-' + activePlayer).innerHTML = 0;

		var winningScore;
		var input = document.querySelector('.final-score').value;

		if(input){
			winningScore = input;
		} else {
			winningScore = 100;
		}
		//3.check if player won the game
		if(scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice1').style.display = 'none';
			document.getElementById('dice2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//nextPlayer
			nextPlayer();
		}
	} 
});


function nextPlayer(){
		//nextplayer
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
		roundScore=0;

		document.getElementById('current-0').innerHTML = 0 ;
		document.getElementById('current-1').innerHTML = 0 ;

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.getElementById('dice1').style.display = 'none';
		document.getElementById('dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;			//state variable

	document.getElementById('dice1').style.display = 'none';
	document.getElementById('dice2').style.display = 'none';

	document.getElementById('score-0').innerHTML = 0 ;
	document.getElementById('current-0').innerHTML = 0 ;
	document.getElementById('score-1').innerHTML = 0 ;
	document.getElementById('current-1').innerHTML = 0 ;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}