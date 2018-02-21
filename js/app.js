//``GIT BRANCHOUT "View Programmer' Comments"`` before final commit on the Master branch, which will keep this project's original comments only, made by Udacity

/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector('.deck');

let array = [
	"fa-diamond",
	"fa-diamond",
	"fa-paper-plane-o",
	"fa-paper-plane-o",
	"fa-anchor",
	"fa-anchor",
	"fa-bolt",
	"fa-bolt",
	"fa-cube",
	"fa-cube",
	"fa-leaf",
	"fa-leaf",
	"fa-bicycle",
	"fa-bicycle",
	"fa-bomb",
	"fa-bomb"
	];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let fragment = document.createDocumentFragment();


// Shuffle function from http://stackoverflow.com/a/2450976
// FISHER-YATES ALGORITM (Udacity's FEND version)
function shuffle() {
	let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let generate = function generateEachCard() {
	let shuffledArray = shuffle(array);

	deck.innerHTML = "";//erases previous <ul> content, if function called again after page refresh

	for (arrayIndex of array) {
		let newElement = document.createElement('li');
		newElement.classList = "card";
		newElement.innerHTML = `<i class="fa ${arrayIndex}"><i/>`;	
		fragment.appendChild(newElement);
	}	
	document.querySelector('.deck').appendChild(fragment);

	let everyCard = document.getElementsByClassName('card');
	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click', function () {
			everyCard.item(i).classList.toggle("open");
			everyCard.item(i).classList.toggle("show");	
		});
	}

}

//Restart Button - Only works calling the generateEachCard() function by it's function expression name `generate`, with parenthesis `()`
let res = function restart () {
	return generate();
}

window.addEventListener('DOMContentLoaded', generate);

document.querySelector('.restart').addEventListener('click', res);
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