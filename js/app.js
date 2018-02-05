/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// FISHER-YATES ALGORITM ALTERNATIVE VERSION//
function shuffle() {
	//let array = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "Q"];


	let A = '<li class="card">\n<i class="fa fa-diamond"></i>\n</li>\n';
	let B = '<li class="card match">\n<i class="fa fa-paper-plano-o"></i>\n</li>\n';
	let C = '<li class="card">\n<i class="fa fa-anchor"></i>\n</li>\n';
	let D = '<li class="card">\n<i class="fa fa-bolt"></i>\n</li>\n';
	let E = '<li class="card open show">\n<i class="fa fa-cube"></i>\n</li>\n';
	let F = '<li class="card">\n<i class="fa fa-leaf"></i>\n</li>\n';
	let G = '<li class="card">\n<i class="fa fa-bycicle"></i>\n</li>\n';
	let H = '<li class="card">\n<i class="fa fa-bomb"></i>\n</li>\n';
	let I = '<li class="card">\n<i class="fa fa-diamond"></i>\n</li>';
	let J = '<li class="card">\n<i class="fa fa-paper-plano-o"></i>\n</li>';
	let L = '<li class="card">\n<i class="fa fa-anchor"></i>\n</li>';
	let M = '<li class="card">\n<i class="fa fa-bolt"></i>\n</li>';
	let N = '<li class="card">\n<i class="fa fa-cube"></i>\n</li>';
	let O = '<li class="card open show">\n<i class="fa fa-leaf"></i>\n</li>';
	let P = '<li class="card">\n<i class="fa fa-bycicle"></i>\n</li>';
	let Q = '<li class="card">\n<i class="fa fa-bomb"></i>\n</li>';
	let array = [A, B, C, D, E, F, G, H, I, J, L, M, N, O, P, Q];
	 
	let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return document.querySelector('.deck').innerHTML = array.join(' ');
}
//innerHtml for or while loop using indexes i and j 
document.addEventListener('DOMContentLoaded', shuffle());

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
