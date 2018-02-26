//``GIT BRANCHOUT "View Programmer' Comments"`` before final commit on the Master branch, which will keep this project's original comments only, made by Udacity

/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
let arrays = [
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
let open = [];
let match = [];
	
let starList = document.querySelector('.stars');
let moveNum = document.querySelector('.moves');

// Shuffle function from http://stackoverflow.com/a/2450976
// FISHER-YATES ALGORITM (Udacity's FEND version)
function shuffle() {
	let currentIndex = arrays.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arrays[currentIndex];
        arrays[currentIndex] = arrays[randomIndex];
        arrays[randomIndex] = temporaryValue;
    }
    return arrays;
}

	/*let moveCount = function mC () {
		let fragment2 = document.createDocumentFragment();
		let li2 = document.createElement('li');
		li2.innerHTML = `<i class="fa fa-star"></i>`;
		fragment2.appendChild('li2');
		starList.appendChild('fragment2');
	*/
//CREATES SHUFFLED DECK
let generate = function generateEachCard() {
	let shuffledArrays = shuffle(arrays);
	let fragment = document.createDocumentFragment();
	arrays.forEach(function createCard(array) {
		let li = document.createElement('li');
		li.classList = "card";
		li.innerHTML = `<i class="fa ${array}"><i/>`;	
		fragment.appendChild(li);
	});
	deck.appendChild(fragment);
}
generate();

//CREATES STAR ICON ON THE MOVE COUNTER
let mC = function moveCounter() {
	let fragment = document.createDocumentFragment();
/*	arrays.forEach(function createCard(array) {*/
		let li = document.createElement('li');
		/*li.classList = "card";*/
		li.innerHTML = `<i class="fa fa-star"><i/>`;	
		fragment.appendChild(li);
/*	});*/
	starList.appendChild(fragment);
}

let nMC = function NumericMoveCounter () {
	moveNum.innerHTML = document.querySelectorAll('.fa-star').length;
}
				
let everyCard = document.getElementsByClassName('card');

//REVEALS CARD ON CLICK
let game = function() {
	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click', function () {

			// PREVENTS MATCHING SAME CARD UPON DOUBLE CLICK: checks if the open array item of index `i`, to be added in this iteration, holds the same symbol as the one provided in the previous iteration (`i - 1`). If it doesn't, then the code proceds to check if a pair of clicked cards matches the same symbol.
			if (!open.includes(everyCard.item(i))) {				
				open.splice(0, 0, everyCard.item(i));
				open[0].classList.add("open", "show");


				if (open.length === 2) {				
					
					mC();
					nMC();

					if ((open[0].firstChild.outerHTML === open[1].firstChild.outerHTML)) {
						match = open.slice();
						match[0].classList.add("match");
						match[1].classList.add("match");
						open[0].classList.remove("open", "show");
						open[1].classList.remove("open", "show");
						match[0].classList.remove("open", "show");
						match[1].classList.remove("open", "show");
						open.splice(0, 2);
					} else {						
					}
				}
				window.addEventListener('click', function () { 
					if (open.length > 2) {
						open[0].classList.remove("open", "show");
						open[1].classList.remove("open", "show");
						open[2].classList.remove("open", "show");
						open.splice(0, 3);					
				}});
			}
		if (match.length === 16) {
			window.alert(`Congratulations! You win with ${calc(match.length/2)} matching cards!`);
		}
		});
	}
}

game();



//Restart Button's function
let res = function restart () {
	
	//erases previouslly generated deck's ul
	deck.innerHTML = "";
	starList.innerHTML = "";
	moveNum.innerHTML = "";

	//erases previouslly generated array lists
	open.splice(0, open.length);	
	match.splice(0, match.length);
	
	// GOTTA ERASE THE MOVES COUNTER SO IT CAN START AGAIN FROM ZERO WHEN THIS FUNCTION IS CALLED

	generate();
	game();
}

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