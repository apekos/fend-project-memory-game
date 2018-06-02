/*
 * Create a list that holds all of your cards
 */

const initialArray = [
	'fa-diamond', 'fa-paper-plane-o',
	'fa-anchor', 'fa-bolt',
	'fa-cube', 'fa-leaf',
	'fa-bicycle', 'fa-bomb',
	'fa-diamond', 'fa-paper-plane-o',
	'fa-anchor', 'fa-bolt',
	'fa-cube', 'fa-leaf',
	'fa-bicycle', 'fa-bomb'
];
let clickedCard = [];
let matchedCards = [];
let cardMatch = false;
let movesCounter = 0;
let deck = [];
let container = document.querySelector('.container');
let moves = document.querySelector('.moves');
let restartBtn = document.querySelector('.restart');
let stars = document.querySelectorAll('.fa-star');
let timer = document.querySelector('.timer');
let clock = 0;
let finalTime = 0;



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create card's HTML
function generateCards(array) {
    let list = document.createElement('ul');
    list.classList.add("deck");

    for(let i = 0; i < array.length; i++) {
        let item0 = document.createElement('li');
        let item1 = document.createElement('i');

        item1.classList.add('fa', array[i]);
        item0.classList.add('card');

        item0.appendChild(item1);
        list.appendChild(item0);
    }

    return list;
}

// Add card's to page
function createDeck() {
	let shuffledArray = shuffle(initialArray);
	deck = generateCards(shuffledArray);
	let myElement = document.querySelector('.container');
	myElement.appendChild(deck);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Display a card after being clicked
function displayCard (target) {
	target.classList.remove('close');
	target.classList.add('open', 'show');
}

// Store the clicked card in an array
function storeClickedCard(target) {
	clickedCard.push(target);
}

// Checking if clicked cards match
function checkMatching(array) {
	if (array[0].firstElementChild.className === array[1].firstElementChild.className) {
		cardMatch = true;
	}
	else {
		cardMatch = false;
	}
}

// If the cards do match, lock the cards in the open position
function openCard(array) {
	array.forEach( function(elem) {
		elem.classList.remove('open', 'show');
		elem.classList.add('match');
	});
	matchedCards.push(array[0], array[1]);
	clickedCard = [];
}

// If the cards do not match, put them face down
function hideCard(array) {
	array.forEach( function(elem) {
		elem.classList.remove('open', 'show');
		elem.classList.add('close');
	});
	clickedCard = [];
}
// What happens when a click occurs
function handleClicks() {
	let cards = document.querySelectorAll('.card');
	// Removing event listener from the clicked card
	this.removeEventListener('click', handleClicks);
	countMoves();
	score();
	displayCard(this);
	storeClickedCard(this);
	
	if (clickedCard.length == 2) {
		cards.forEach( function(card) {
			// Removing event listener from all the cards
			card.removeEventListener('click', handleClicks);
		});	

		checkMatching(clickedCard);

		if (cardMatch == true) {
			openCard(clickedCard);
		} else {
			setTimeout(function() {
				hideCard(clickedCard);
			}, 500);
		}

		setTimeout(function() {
			// Adding event listener back to all cards
			cards.forEach( function(card) {
				card.addEventListener('click', handleClicks);
			});
			// Removing event listener from the matched cards
			matchedCards.forEach( function(card) {
				card.removeEventListener('click', handleClicks);
			});
		},500);
	}
	if (matchedCards.length == 16) {
		endGame();		
	}
}

// Setting the score
function score() {
	if (movesCounter > 24 && movesCounter <=30) {
		stars[2].style.color = '#ebeced';
	} else if (movesCounter > 32) {
		stars[1].style.color = '#ebeced';
	}
}

// Counting and displaying moves
function countMoves() {
	movesCounter++;
	let move = Math.floor(movesCounter/2);

	if (move == 1) {
		time(); // Starting the timer
		moves.textContent = move + ' Move';
	} else if (movesCounter > 1) {
		moves.textContent = move + ' Moves';
	}
}

//Timer
function time() {
	let seconds = 0;
	let minutes = 0;

	clock = setInterval(function(){
		seconds++;
		minutes = Math.floor(seconds / 60);

	function zero(num) {
		if (num < 10) {
			num = '0' + num;
			return num;
		}
		return num;
	}
	
	finalTime = zero(minutes) + ':' + zero(seconds % 60);
	timer.textContent = finalTime;
	}, 1000);
	return finalTime;
}

// Restarting game when restart button clicked
function restart() {
	clickedCard = [];
	matchedCards = [];
	stars[1].style.color = '';
	stars[2].style.color = '';
	movesCounter = 0;
	clearInterval(clock);
	timer.textContent = '00:00';
	moves.textContent = '0 Moves';
	let deck = document.querySelector('.deck');
	container.removeChild(deck);
	startGame();
}

restartBtn.addEventListener('click', restart);

function myModal() {
	// Get the modal
	let modal = document.getElementById('myModal');

	// Get the <span> element that closes the modal
	let closeBtn = document.getElementsByClassName('close')[0];

	// Get the final score
	let finalScore = document.querySelector(".stars").innerHTML;

	let printScore = document.querySelector('.printScore');
	let printMoves = document.querySelector('.printMoves');
	let printTime = document.querySelector('.printTime');

	let playAgain = document.querySelector('.playAgain');

	// When all cards are matched get final statistics
	printScore.innerHTML = finalScore;
	printMoves.innerHTML = movesCounter;
	printTime.innerHTML = finalTime;

	// Display the modal
	setTimeout(function() {
		modal.style.display = "block";
	}, 200);

	// When the user clicks on <span> (x), close the modal
	closeBtn.onclick = function() {
	    modal.style.display = "none";
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	};

	playAgain.onclick = function() {
	    modal.style.display = "none";
	    restart();
	};
}

// Start playing the game
function startGame() {
	createDeck();
	let cards = document.querySelectorAll('.card');
	// Adding event listener to every card
	cards.forEach( function(card) {
		card.addEventListener('click', handleClicks);
	});
}

function endGame() {
	clearInterval(clock);
	myModal();
}

startGame();