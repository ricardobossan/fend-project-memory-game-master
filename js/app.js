/*
* TODO: Adjust code to meet the project rubric (Project Specification):
* Congratulations Pop Up: 
** Ask if the player wants to play again
** How much time it took the player to finish the game
** What the star rating was
* Restart Button:
** restart timer
** restart star rating
* Star Rating:
** starts withh 3 stars, changes to two and then to one. The number of moves to change rating is up to me
* Timer:
** Timer is displayed at the begining of the game and starts to count
** When the player wins, the timer stops
* Usability: 
** should with modern desktop, tablet and phone browsers // Motomaxx, Moto G5 Plus e o de Amanda não funcionam!
* README:
** detail the game and all dependencies
* Comments:
** comment adjustment to Project Specifications
* Javascript Styleguide: Check it all over again
*/
/*
let time = 0;

let running = 0;

function startPause() {
	if (running === 0) {
		running = 1;
		increment();
		document.getElementById('startPause').innerHTML = "Pause";
	} else {
		running = 0;
		document.getElementById('startPause').innerHTML = "Resume";
	}
}

function reset() {
	running = 0;
	time = 0;
	document.getElementById('startPause').innerHTML = "Pause";
}

function increment () {
	if(running === 1) {
		setTimeout(function() {
			time++;
			let mins = Math.floor(time/10/60);
			let secs = Math.floor(time/10);
			let tenths = time % 10;
			document.getElementById("timer").innerHTML = mins + ":" + secs + ":" + tenths;
			increment();
		}, 100);
	}
}
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

let open = []; // array list for the cards that are turned (`.open`)
let match = []; // array list for the pairs of cards that have the same symbol (`.match`)
	
let starCounter = document.querySelector('.stars');
let moveNum = document.querySelector('.moves');

/*
Shuffle function from http://stackoverflow.com/a/2450976
Fisher-Yates Algoritm (Udacity's FEND version)
*/
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

// Creates a shuffled deck (`.deck`)
const generate = function () {
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

let timeCounter = document.getElementById('time-counter'),
    s = 0, m = 0, h = 0;

function myTimer() {
    s++;
    if (s >= 60) {
        s = 0;
        m++;
        if (m >= 60) {
            m = 0;
            h++;
        }
    }
  
    timeCounter.textContent = `${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${s > 9 ? s : "0" + s}`;

    setTimeout(myTimer, 1000);
}
/*function timer() {
    t = setTimeout(timer, 1000);
}
timer();*/
setTimeout(myTimer, 1000);

// Creates a star icon on the move counter (.stars)
const starMoveCounter = function () {
	let fragment = document.createDocumentFragment();
		let li = document.createElement('li');
		li.innerHTML = `<i class="fa fa-star"><i/>`;
		fragment.appendChild(li);
		starCounter.appendChild(fragment);
}

// display the number of moves on the move counter (.moves)
const numericMoveCounter = function  () {
	moveNum.innerHTML = document.querySelectorAll('.fa-star').length + " Moves";
}
				
// display victory message after the 16 cards are matched, with a wait of 800 milliseconds
const victory = function  () {
	if (document.getElementsByClassName('match').length === 16) {
		setTimeout(function() {
			window.alert("Congratulations! You took " + timeVariable + " to finished the game! And Your rating was" + document.getElementsByClassName('fa-star').length + "!\nPlay again?");
		}, 800);

		// if 16 cards are matching - which means the game is over - restarts game automatically, after waiting 2 seconds
		setTimeout(function() {
			restart();
		}, 2000);
	};
}

//Restart Button's function
const restart = function () {
	
	//erases previouslly generated deck's ul (`.deck`), star counter (`.stars`) and moves counter(`.moves`)
	deck.innerHTML = "";
	starCounter.innerHTML = "";
	moveNum.innerHTML = "";

	//erases previouslly generated array list for open cards (`.open`) and for matching card pairs (`.match`)
	open.splice(0, open.length);
	match.splice(0, match.length);
	
	//generate new shuffled array and restarts game
	generate();
	game();
}

const everyCard = document.getElementsByClassName('card');

const game = function() {
	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click', function () {

			// Prevents matching the same card upon double click: checks if the open array item of index `i`, to be added in this iteration, holds the same symbol as the one provided in the previous iteration (`i - 1`). If it doesn't, then the code proceds to check if a pair of clicked cards matches the same symbol.
			if (!open.includes(everyCard.item(i))) {

				// Reveals each card on click, adding them to the `open` array list
				open.splice(0, 0, everyCard.item(i));
				open[0].classList.add("open", "show");

				if (open.length === 2) {
					
					// updates move counters each time a pair of cards is turned
					starMoveCounter();
					numericMoveCounter();

					// checks if pair of cards have the same symbol and, if they do, adds them to the `match` array list
					if ((open[0].firstChild.outerHTML === open[1].firstChild.outerHTML)) {
						match = open.slice();
						match[0].classList.add("match");
						match[1].classList.add("match");
						open[0].classList.remove("open", "show");
						open[1].classList.remove("open", "show");
						match[0].classList.remove("open", "show");
						match[1].classList.remove("open", "show");
						open.splice(0, 2);

						// if 16 cards are matching its symbols, displays victory alert box
						victory();
					}
/*
				When a pair of cards is turned up, but their symbols are not the same, the cards are held up until the window is clicked again.
				Also, if a single card is turned up at this point, it is turned down too, so the `game()` function iterates over and turns another card up, to see if it forms a pair of cards with the same symbol
*/
				window.addEventListener('click', function () {
					if (open.length > 2) {
						open[0].classList.remove("open", "show");
						open[1].classList.remove("open", "show");
						open[2].classList.remove("open", "show");
						open.splice(0, 3);
				}});
				}
			}
		});
	}
}

// calls function to create deck of shuffled cards
generate();

// starts the game's logic
game();

// makes the restart button work when clicked (`.restart`)
document.querySelector('.restart').addEventListener('click', restart);