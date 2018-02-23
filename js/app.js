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
let tempMatch = [];
let match = [];
let cardSymbol1 = "";
let cardSymbol2 = "";
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

	//erases previous <ul> content, when the restart button is clicked
	deck.innerHTML = "";

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
let show = function() {
	/*document.getElementsBy*/
	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click', function () {
				/*open[3].classList.remove("open", "show");*/
			open.splice(0, 0, everyCard.item(i));
			open[0].classList.add("open", "show");
			if (open.length < 2) {
				return;
			} else if (open.length === 2) {
				//AQUI A DECLARAÇÃO OU ASSIGNMENT DE VARIÁVEL NAO ESTÁ FUNCIONANDO
				cardSymbol1 = open[0].firstChild;
				cardSymbol2 = open[1].firstChild;				
				if (cardSymbol1.outerHTML === cardSymbol2.outerHTML) {
					let ifMatch = function () {
					if (cardSymbol1.outerHTML === cardSymbol2.outerHTML/* && cardSymbol1 === cardSymbol2*/) {
						return true;						
					} else {
						return;
					}
				}		
					tempMatch = open.filter(ifMatch);
					match = tempMatch.slice();
					match[0].classList.add("match");
					match[1].classList.add("match");
					open[0].classList.remove("open", "show");
					open[1].classList.remove("open", "show");
					match[0].classList.remove("open", "show");
					match[1].classList.remove("open", "show");
					tempMatch.splice(0, 2);
					open.splice(0, 2);
				} else {						
				}
			} else {
			return;				
			}
			window.addEventListener('click', function () { if (open.length > 2) {
				open[0].classList.remove("open", "show");
				open[1].classList.remove("open", "show");
				open[2].classList.remove("open", "show");
				open.splice(0, 3);
				/*if (open.length)
				for (let z = 0; z < 1; z++) {
					window.addEventListener('click', function() {
						console.log("did it jump one turn?");
						console.log("No. What next?")
					});
				}				*/
			}})
			
		});
	}
}



show();

//Restart Button
let res = function restart () {
	generate();
	show();
}

//let open = function ()

document.querySelector('.restart').addEventListener('click', res);

//document.getElementsByClassName('open').addEventListener
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