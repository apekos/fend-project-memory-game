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
let matchedArray = [];
let cardMatch = false;
let moves = 0;


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
function renderCards() {
	let shuffledArray = shuffle(initialArray);
	let deck = generateCards(shuffledArray);
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
function displayCard (element) {
	element.classList.add('open', 'show');
}

// Store the clicked card in an array
function storeClickedCard(element) {
	clickedCard.push(element);
	return clickedCard;
}

// Checking if clicked cards match
function checkMatching(array) {
	if (array[0].firstElementChild.className === array[1].firstElementChild.className) {
		cardMatch = true;
		matchedArray.push(array[0], array[1]);
	}
	else {
		cardMatch = false;
	}
	return cardMatch, matchedArray;
}

// If the cards do match, lock the cards in the open position
function openCard(array) {
	array[0].classList.remove('open', 'show');
	array[0].classList.add('match');
	array[1].classList.remove('open', 'show');
	array[1].classList.add('match');
	return array;
}

// If the cards do not match, put them face down
function hideCard(array) {
	array.forEach( function(elem) {
		elem.classList.remove('open', 'show');
	});
	/*array[0].classList.remove('open', 'show');
	array[1].classList.remove('open', 'show');
	return array;*/
}

function handleClicks() {
	if (clickedCard.length == 2) {
		checkMatching(clickedCard);
		if (cardMatch == true) {
			openCard(clickedCard);
			clickedCard = [];
		} else {
			setTimeout(function() {
				hideCard(clickedCard);
				clickedCard = [];
			}, 700);
		}
	}
}

function countMoves() {
	moves++;
}

function startGame() {
	renderCards();
	let cards = document.querySelectorAll('.card');

	cards.forEach( function(card) {
		card.addEventListener('click', function(e) {
			if (!card.classList.contains('open') && !card.classList.contains('match')) {
				displayCard(card);
				storeClickedCard(card);
				handleClicks();
				countMoves();
			}
			console.log(moves);
		});

// Remove event listener, don't know how :(		
		/*card[i].removeEventListener('click', function() {
		});*/
	}); 
}

startGame();