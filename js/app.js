/*
* TODO: Adjust code to meet the project rubric (Project Specification):
OK * Congratulations Pop Up: 
OK ** Ask if the player wants to play again OK
OK ** How much time it took the player to finish the game
OK * Moves counter
OK ** fix it, so it won't rely wrongly on the star counter anymore
OK ** What the star rating was
OK * Restart Button:
OK ** restart timer
OK ** restart star rating
OK * Star Rating:
** OK starts withh 3 stars, changes to two and then to one. The number of moves to change rating is up to me
OK * Timer:
OK ** Timer is displayed at the begining of the game and starts to count
OK ** When the player wins, the timer stops
OK * Usability: 
OK ** create dynamicaly generated easy, normal and hard difficulty, and respective boards, easy : 14, 19 and 24 cards; normal: 
OK ** should with modern desktop, tablet and phone browsers 
OK ** Motomaxx, Moto G5 Plus e o de Amanda não funcionam!
OK * Fix total time of game that displays on the end (.totalTime). When `.totalTime` > 60s, it displays minutes:%seconds (e.g. 01 : 78, which menas 1 minute and 78% of another minute)

							DONE ABOVE
---------------------------------------------------------------------

//
// TODO
//
* Comments:
** comment adjustment to Project Specifications
* Javascript Styleguide: Check it all over again
* README:
** detail the game and all dependencies
*/


/*
Global Variables
*/

const deck = document.querySelector('.deck'),
	everyCard = document.getElementsByClassName('card'),
	starNum = document.querySelector('.stars'),
	moveNum = document.querySelector('.moves');

let timeCounter = document.getElementById('time-counter'),
    s = 0, m = 0, h = 0;
    gameStart = "",
	move = 0,
	open = [], // array list for the cards that are turned (`.open`)
	match = [], // array list for the pairs of cards that have the same symbol (`.match`)
	everyStar = document.getElementsByClassName('fa-star'),
	b = "",
	difficulty = "easy",
	handStyle = document.getElementsByClassName('hands'),
	// game starts at easy difficulty
	arrays = [
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
		"fa-heart",
		"fa-heart",		
		"fa-bomb",
		"fa-bomb"
	];

/*
Functions
*/

// makes the violet hand hovering above the easy difficulty opotion visible by the beggining of the game (which starts set to `easy` - see line 55
handStyle.item(0).style.visibility = 'visible';

let isEasy = function () {
	difficulty = "easy";
	handStyle.item(1).style.visibility = 'hidden';
	handStyle.item(2).style.visibility = 'hidden';

	handStyle.item(0).style.visibility = 'visible';
	arrays = [
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
			"fa-heart",
			"fa-heart",
			"fa-bomb",
			"fa-bomb"
		];
	restart();
}

let isNormal = function () {
	difficulty = "normal";
	handStyle.item(0).style.visibility = 'hidden';
	handStyle.item(2).style.visibility = 'hidden';
	handStyle.item(1).style.visibility = 'visible';
	arrays = [
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
			"fa-bomb",
			"fa-globe",
			"fa-globe",
			"fa-fighter-jet",
			"fa-fighter-jet"
		];
	restart();
}

let isHard = function () {
	difficulty = "hard";
	handStyle.item(0).style.visibility = 'hidden';
	handStyle.item(1).style.visibility = 'hidden';
	handStyle.item(2).style.visibility = 'visible';
	arrays = [
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
			"fa-bomb",
			"fa-globe",
			"fa-globe",
			"fa-fighter-jet",
			"fa-fighter-jet",
			"fa-heart",
			"fa-heart",
			"fa-gift",
			"fa-gift"
		];
	restart();
}

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

// Hides all card's symbols, shown for 4 seconds on game start (by the `generate` function)
function hideCards () {
	setTimeout(function() {
	let element = 0;
		for (let t = 0; t < document.querySelectorAll('.card').length; t++) {document.querySelector('.deck').children[t].classList.remove("open", "show")};;
	}, 4000);
}

// Creates a shuffled deck (`.deck`), displays all cards symbols, then hides then with the `hideCards()` callback function
const generate = function () {
	let shuffledArrays = shuffle(arrays);
	let fragment = document.createDocumentFragment();
	arrays.forEach(function createCard(array) {
		let li = document.createElement('li');
		li.classList = "card";
		li.innerHTML = `<i class="fa ${array}"><i/>`;
		li.classList.add("open", "show");
		fragment.appendChild(li);
	});
	deck.appendChild(fragment);

	hideCards();
}

// Logic for timer, located on top-right corner
let timer = function myTimer() {
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
// set to run on 1sec intervals, each time the function iterates over itself, until the game is through
    setTimeout(myTimer, 1000);
}

// display the number of moves on the move counter (.moves)
const moveCounter = function () {
	move++;
	moveNum.innerHTML = move <= 1 ? move + " Move" : move + " Moves";
}

// If move >= 13, removes 1 star; >= 17, removes another; >= 21, another
const starCounter = function () {
	if (difficulty === "easy" ? move === 14 : difficulty === "normal" ? move === 19 : move === 29) {
		starNum.firstElementChild.outerHTML = "";			
	}
	if (difficulty === "easy" ? move === 19 : difficulty === "normal" ? move === 25 : move === 30) {
		starNum.firstElementChild.outerHTML = "";		
	}
	if (difficulty === "easy" ? move === 24 : difficulty === "normal" ? move === 30 : move === 35) {
		starNum.innerHTML = "<li><i><small>No star for you...</small></i></li>";
	}
}

const dancinghand = function() {
	handStyle.item(0).classList.toggle('hand-dancing');
	handStyle.item(1).classList.toggle('hand-dancing');
	handStyle.item(2).classList.toggle('hand-dancing');

}

let blinking = function () {
	if (difficulty === "easy" ? move >= 14 && move < 19 : difficulty === "normal" ? move >= 19 && move < 25 : move >= 29) {
		starNum.classList.toggle('blink-1');
	}	
}

let blinking2 = function () {
	if (difficulty === "easy" ? move >= 19 && move < 24 : difficulty === "normal" ? move >= 25 && move < 30 : move >= 30){
		starNum.classList.remove('blink-1');
		starNum.classList.toggle('blink-2');
	}
	if (difficulty === "easy" ? move >= 24 : difficulty === "normal" ? move >= 30 : move >= 35){
		starNum.classList.remove('blink-3');
		starNum.classList.toggle('blink-3');
	}
}

// display victory message after the array.length cards are matched, with a wait of 800 milliseconds
const victory = function () {
	if (document.getElementsByClassName('match').length === arrays.length) {
		let gameEnd = Date.now();
		//function totalGameTime () {
		let gameTime = gameEnd - gameStart;		
		//totalGameTime();
		let seconds = gameTime / 1000;
		
		//logic for respecting concordance between singular and plural words and numbers, while displaying the duration of game (avoid errors like `1 seconds`, or `1 minutes`)
		if (seconds >= 60) {
			if (Math.floor(seconds % 60) === 0) {
				if (Math.floor(seconds) === 60) {
					totalTime = `1 minute`;
				} else {
					totalTime = `${Math.floor(seconds / 60)} minutes`;
				}
			} else if (Math.floor(seconds % 60) === 1) {
				if (Math.floor(seconds) === 61) {
					totalTime = `1 minute and 1 second`;			
				} else {
					totalTime = `${Math.floor(seconds / 60)} minutes and 1 second`;
				}
			} else {
				totalTime = `${Math.floor(seconds / 60)} minutes and ${Math.floor(seconds % 60)} seconds`;
			}			
		} else {
			totalTime = `${Math.floor(seconds)} seconds`;
		}


		// displays 
		setTimeout(function() {
			window.alert("Congratulations! You took " + totalTime + " to finish the game! And Your rating was " + everyStar.length + (everyStar.length === 1 ? " star" : " stars") + ", at the " + difficulty.toUpperCase() + " difficulty!\n\nPlay again?");
		}, 800);

		// if array.length cards are matching - which means the game is over - restarts game automatically, after waiting 2 seconds
		setTimeout(function() {
			restart();
		}, 1000);
	};
}

//Restart Button's function
const restart = function () {
	
	//erases previouslly generated deck's ul (`.deck`), star counter (`.stars`) and moves counter(`.moves`)
	s = 0;
	m = 0;
	h = 0;
	move = 0;
	deck.innerHTML = "";
	timerCounter = "00 : 00 : 00";
	starNum.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	moveNum.innerHTML = "0 Moves";

	//erases previouslly generated array list for open cards (`.open`) and for matching card pairs (`.match`)
	open.splice(0, open.length);
	match.splice(0, match.length);
	starNum.classList.remove('blink-1', 'blink-2', 'blink-3');
		
	//generate new shuffled array and restarts game
	generate();
	game();
}

const game = function() {


	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click', function () {

			// Prevents matching the same card upon double click: checks if the open array item of index `i`, to be added in this iteration, holds the same symbol as the one provided in the previous iteration (`i - 1`). If it doesn't, then the code proceds to check if a pair of clicked cards matches the same symbol.
			if (!open.includes(everyCard.item(i))) {
				if (open.length >= 2) {
					open[0].classList.remove("open", "show");
					open[1].classList.remove("open", "show");
					/*open[2].classList.remove("open", "show");*/
					open.splice(0, 3);
				}
				// Reveals each card on click, adding them to the `open` array list
				open.splice(0, 0, everyCard.item(i));
				open[0].classList.add("open", "show");

				if (open.length === 2) {
					
					// updates move counters each time a pair of cards is turned
					moveCounter();
					starCounter();
					/*moveCounter();*/

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

						// if array.length cards are matching its symbols, displays victory alert box
						victory();
					}

/*
				When a pair of cards is turned up, but their symbols are not the same, the cards are held up until the window is clicked again.	
				Also, if a single card is turned up at this point, it is turned down too, so the `game()` function iterates over and turns another card up, to see if it forms a pair of cards with the same symbol
*/
				/*window.addEventListener('click', function () {*/
					/*});*/
				}
			}
		});
	}
}

// calls function to create deck of shuffled cards
generate();


document.getElementById('easy').addEventListener('click', isEasy);
document.getElementById('normal').addEventListener('click', isNormal);
document.getElementById('hard').addEventListener('click', isHard);


//chooseDifficulty();

// runs timer function after 1 second
setTimeout(timer, 1000);

setInterval (dancinghand, 1000);

// if 2 or 1 stars, blinks red, if 0, stays red
setInterval (blinking, 1900);

setInterval (blinking2, 600);

// stores the time the game started
gameStart = Date.now();

// starts the game's logic
game();

// makes the restart button work when clicked (`.restart`)
document.querySelector('.restart').addEventListener('click', restart);