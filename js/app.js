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
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

let everyCard = document.getElementsByClassName('card');

//REVEALS CARD ON CLICK
let game = function() {
	/*document.getElementsBy*/
	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click', function () {
				/*open[3].classList.remove("open", "show");*/
			if (!open.includes(everyCard.item(i))) {				
			/*open.classList.contains(`${everyCard.item[i].firstChild.classList}`)) {
				return;
			} else {*/
				open.splice(0, 0, everyCard.item(i));
				open[0].classList.add("open", "show");
				if (open.length === 2) {				
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
				window.addEventListener('click', function () { if (open.length > 2) {
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