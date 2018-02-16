/*NEXT STEP:
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//``GIT BRANCHOUT "View Programmer' Comments"`` before final commit on the Master branch, which will keep this project's original comments only, made by Udacity

/*
 * Create a list that holds all of your cards
 */
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
// FISHER-YATES ALGORITM (Udacity's FEND version
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

function generateEachCard() {
	let shuffledArray = shuffle(array);

	for (arrayIndex of array) {
		let newElement = document.createElement('li');
		newElement.classList = "card";
		newElement.innerHTML = `<i class="fa ${arrayIndex}"><i/></li>`;
		fragment.appendChild(newElement);
	}	

/*OR .forEach()	array Method (comprehend code's logic):
	shuffledArray.forEach(function(arrayIndex) {
		let newElement = document.createElement('li');
		newElement.classList = "card";
		newElement.innerHTML = `<i class="fa ${arrayIndex}"><i/></li>`;
		fragment.appendChild(newElement);
	});*/

/*OR for loop (for better understanding the code's logic):
	for (let arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
		let newElement = document.createElement('li');
		newElement.classList = "card";
		newElement.innerHTML = `<i class="fa ${shuffledArray[arrayIndex]}"><i/></li>`;
		fragment.appendChild(newElement);
	};
	*/

	document.querySelector('.deck').appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', generateEachCard());

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
