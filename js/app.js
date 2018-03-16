/*
//
// TODO
//

 CURRENT --><--

--------------------------------------------------------------------

/*
//
// DONE ALREADY
//

OK * Project reviewer:
OK ** Remake README properly, keeping the `Credits and Acknowledgement`
OK ** Move global variables into function, for safety
OK ** customize modal, with lienear-gradient.And all other elements on a darker background
OK ** lines 259-263, use loop instead of repeating statements
OK ** See Arrow functions! @https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
OK ** test styleguide
OK ** Move global variables into function, for safety
OK ** customize modal, with lienear-gradient.And all other elements on a darker background
OK ** lines 259-263, use loop instead of repeating statements
OK ** See Arrow functions! @https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
OK * Adjust code to meet the project rubric (Project Specification):
OK * Review JS comments
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
OK ** starts withh 3 stars, changes to two and then to one. The number of moves to change rating is up to me
OK * Timer:
OK ** Timer is displayed at the begining of the game and starts to count
OK ** When the player wins, the timer stops
OK * Usability:
OK ** create dynamicaly generated easy, normal and hard difficulty, and respective boards, easy : 14, 19 and 24 cards; normal:
OK ** should with modern desktop, tablet and phone browsers
OK ** Motomaxx, Moto G5 Plus e o de Amanda não funcionam!
OK * Fix total time of game that displays on the end (.totalTime). When `.totalTime` > 60s, it displays minutes:%seconds (e.g. 01 : 78, which menas 1 minute and 78% of another minute)
OK * Comments:
OK ** comment adjustment to Project Specifications
OK * README:
OK ** detail the game and all dependencies
OK	* Javascript Styleguide: Check it all over again
OK * Switch one of the normal difficulty's symbols for the heart symbol, for color
---------------------------------------------------------------------
*/

/*
Functions
*/

// Function for hiding both victory's modal and dark background, from previous games
const hideRestart = () => {
	document.getElementById('peel').outerHTML = "";
	document.getElementById('modal').style.display = "none";
	restart();
};

/*
3 Difficulty Setting Functions
*/

// the following blocks of functions (`isEasy`, `isnormal` and `isHard`) switch between difficulty levels upon click, changing the number of cards, it's symbols and number of moves necessary to lose stars/rank.
// Each of these difficulty setting functions hides the two other hovering violet hand pointers at the top of each displayed difficulty option. Displays the one above the chosen difficulty level
// Function restart is called at the end of each of this difficulty blocks, to make all game variables start from zero
let isEasy =  () => {
	let s, m, h;
	s = 0, m = 0, h = 0;
	difficulty = "easy";
	let handStyle = document.getElementsByClassName('hands');
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
};

let isNormal = () => {
	let s, m, h;
	s = 0, m = 0, h = 0;
	difficulty = "normal";
	let handStyle = document.getElementsByClassName('hands');
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
			"fa-heart",
			"fa-heart",
			"fa-bomb",
			"fa-bomb",
			"fa-globe",
			"fa-globe",
			"fa-fighter-jet",
			"fa-fighter-jet"
		];
	restart();
};

let isHard = () => {
	let s, m, h;
	s = 0, m = 0, h = 0;
	difficulty = "hard";
	let handStyle = document.getElementsByClassName('hands');
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
};

/*
Shuffle function from http://stackoverflow.com/a/2450976
Fisher-Yates Algoritm (Udacity's FEND version)
*/

const shuffle = () => {
	let currentIndex = arrays.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arrays[currentIndex];
        arrays[currentIndex] = arrays[randomIndex];
        arrays[randomIndex] = temporaryValue;
    }
    return arrays;
};

// Hides all card's symbols, shown for 4 seconds on game start (by the `generate` function)
const hideCards = () => {
	setTimeout( () => {
	let element = 0;
		for (let t = 0; t < document.querySelectorAll('.card').length; t++) {document.querySelector('.deck').children[t].classList.remove("open", "show")};;
	}, 4000);
};

// Creates a shuffled deck (`.deck`), that displays all cards symbols, then hides them with the `hideCards()` callback function
const generate =  () => {
	const deck = document.querySelector('.deck');
	shuffle(arrays);
	let fragment = document.createDocumentFragment();
	arrays.forEach( (array) => {
		let li = document.createElement('li');
		li.classList = "card";
		li.innerHTML = `<i class="fa ${array}"><i/>`;
		li.classList.add("open", "show");
		fragment.appendChild(li);
	});
	deck.appendChild(fragment);
	hideCards();
};

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
    let timeCounter = document.getElementById('time-counter');
    timeCounter.textContent = `${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${s > 9 ? s : "0" + s}`;

	// set to run on 1sec intervals, each time the function iterates over itself, until the game is through
    setTimeout(myTimer, 1000);
};

// Function for calling animation on the pointing violet hovering hand, at intervals of 1 second, which will be set further down the code bellow
const movingHand =  () => {
	let handStyle = document.getElementsByClassName('hands');
	for (let f = 0; f <= 2; f++) {
		document.getElementsByClassName('hands').item(f).classList.toggle('hand-dancing');
	}
};

//Restart Button's function: erases previouslly dinamically generated js code, so it can start from 0, upon new round
const restart =  () => {
	const deck = document.querySelector('.deck');
	const starNum = document.querySelector('.stars');
	const moveNum = document.querySelector('.moves');

	let open = [];
	let show = [];
	let match = [];
	s = 0;
	m = 0;
	h = 0;
	let gameStart = "";
	gameEnd = "";
	gameTime = 0;
	seconds = 0;
	totalTime = 0;
	move = 0;
	deck.innerHTML = "";
	timerCounter = "00 : 00 : 00";
	starNum.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	moveNum.innerHTML = "0 Moves";
	starNum.classList.remove('blink-1', 'blink-2', 'blink-3');

	//erases previouslly generated array lists, both for open (`.open`) and matching (`.match`) card pairs
	open.splice(0, open.length);
	match.splice(0, match.length);

	//generate new shuffled array
	generate();

	//begins game's logic
	game();
};

// Logic for the game. It moves cards between the `open` and `match`arrays, and adds, removes or toggles it's classes (`.open`, `.show` and `.match`)
const game = () =>{
	// Event for turning of victory modal, from a previous game, and restarting i's variables
	window.removeEventListener('click', hideRestart);
	let modalVar = document.getElementById('modal');
	let everyStar = document.getElementsByClassName('fa-star');
	const starNum = document.querySelector('.stars');
	const everyCard = document.getElementsByClassName('card');
	let move = 0,
	open = [], // array list for the cards that are turned (`.open`)
	match = [];	 // array list for the pairs of cards that have the same symbol (`.match`)

	// display the number of moves on the move counter (.moves)
	const moveCounter =  () => {
		const moveNum = document.querySelector('.moves');
		move++;
		moveNum.innerHTML = move <= 1 ? move + " Move" : move + " Moves";
	};

	// logic for removing each star/rank at a certain sucessive number of moves (different number of moves required for each difficulty setting)
	const starCounter =  () => {
		const starNum = document.querySelector('.stars');
		if (difficulty === "easy" ? move === 14 : difficulty === "normal" ? move === 20 : move === 25) {
			starNum.firstElementChild.outerHTML = "";
		}
		if (difficulty === "easy" ? move === 19 : difficulty === "normal" ? move === 25 : move === 30) {
			starNum.firstElementChild.outerHTML = "";
		}
		if (difficulty === "easy" ? move === 24 : difficulty === "normal" ? move === 30 : move === 35) {
			starNum.innerHTML = `<li><i><small><b>No star for you... </b><span class ="icon-emo-displeased"></span></small></i></li>`;
		}
	};

	// function with the logic for starting the slower (.blink-1) red blinking star counter, when stars/ranking number reaches 2 stars. Intervals will be se further down the code bellow
	const blinking =  () => {
		const starNum = document.querySelector('.stars');
		if (difficulty === "easy" ? move >= 14 && move < 19 : difficulty === "normal" ? move >= 19 && move < 25 : move >= 29) {
			starNum.classList.toggle('blink-1');
		}
	};

	// Function for faster (`.blink-2`) red blinking star counter field, at given intervals, to be set further down bellow, and removing the `.blink-1` animation. Does the same for the class `.blink-3`
	const blinking2 =  () => {
		const starNum = document.querySelector('.stars');
		if (difficulty === "easy" ? move >= 19 && move < 24 : difficulty=== "normal" ? move >= 25 && move < 30 : move >= 30){
			starNum.classList.remove('blink-1');
			starNum.classList.toggle('blink-2');
		}
	};

	// if 2 or 1 stars, blinks red, if 0 stars, stays red
	const blinkingIntervalID = setInterval (blinking, 1900);
	const blinking2IntervalID = setInterval (blinking2, 600);

	// stores the time the game started
	gameStart = Date.now();

	//adds a click event for every card
	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click',  () => {

			// Prevents matching the same card upon double click: checks if the open array item of index `i`, to be added in this iteration,
			// holds the same symbol as the one provided in the previous iteration (`i - 1`). If it doesn't, then the code proceds to check if a pair of clicked cards matches or not the same symbol.
			if (!open.includes(everyCard.item(i))) {

				// when a third card is clicked/iterated, and, therefore, turned open, the first two are turned down and have their symbols hidden; while leaving a third card (from last iteration) turned open,
				// to see if it matches the next card to be turned open upon the subsequent click/iteration, or if it doesn't match, which would have this processes repeated over (in another words,
				// this step removes the `.open` and `.show´ classes from the first two iterated cards added to the open array list, and then removes those cards from the list altogheter,
				// leaving the third one with those two classes, remaining in the open array)
				if (open.length >= 2) {
					open[0].classList.remove("open", "show");
					open[1].classList.remove("open", "show");
					open.splice(0, 2);
				}
				// Reveals a card on click, adding them to the `open` array list
				open.splice(0, 0, everyCard.item(i));
				open[0].classList.add("open", "show");

				// checks if 2 cards are in the open array (one added to this array in the last click/iteration, and the other added on the present click/iteration)
				if (open.length === 2) {
					// calls the functions that updates the move and star counters each time a pair of cards is turned
					moveCounter();
					starCounter();
					if (difficulty === "easy" ? move === 24 : difficulty === "normal" ? move === 30 : move === 35){
						starNum.classList.remove('blink-2');
						starNum.classList.add('blink-3');
		}

					// checks if the pair of cards have the same symbol and, if they do, adds them to the `match` array list, removes the `.open` and `.show` classes, and adds them the `.match` class
					if ((open[0].firstChild.outerHTML === open[1].firstChild.outerHTML)) {
						match = open.slice();
						match[0].classList.add("match");
						match[1].classList.add("match");
						open[0].classList.remove("open", "show");
						open[1].classList.remove("open", "show");
						match[0].classList.remove("open", "show");
						match[1].classList.remove("open", "show");
						open.splice(0, 2);

					// displays victory message after the array.length number of cards are matched (each difficulty level has it's own array, with different number of elements and
					//, therefore, length), with a wait of 800 milliseconds
					const victory =  () => {
						if (document.getElementsByClassName('match').length === arrays.length) {
							let gameEnd = Date.now();
							let gameTime = gameEnd - gameStart;
							let seconds = gameTime / 1000; // from milliseconds to seconds

							// logic for respecting concordance between singular and plural words and numbers (avoid errors like `1 seconds`, or `1 minutes`)
							// in modal shown upon victory, displayin how long the game as lasted (along with other information about the player's performance).
							// It's the same logic for all difficulty levels
							// If game took 60 or more seconds:
							if (seconds >= 60) {
								// if game has round minutes, and no seconds:
								if (Math.floor(seconds % 60) === 0) {
									//if game has 1 perfect minute, makes sure message is shown with singular concordance. Else, if game has 2 or more perfect minutes, message with plural concordance:
									if (Math.floor(seconds) === 60) {
										totalTime = `1 minute` || `${Math.floor(seconds / 60)} minutes`;
									}
								// same logic as the correspondent if statement, but with the expression ``1 second`` after the first minute
								} else if (Math.floor(seconds % 60) === 1) {
									if (Math.floor(seconds) === 61) {
										totalTime = `1 minute and 1 second` || `${Math.floor(seconds / 60)} minutes and 1 second`;
									}
								// plural concordance for plural minutes and seconds
								} else {
									totalTime = `${Math.floor(seconds / 60)} minutes and ${Math.floor(seconds % 60)} seconds`;
								}
							// less than one minute. No game will last 1 second, so respective statement uncessary, obviously
							} else {
								totalTime = `${Math.floor(seconds)} seconds`;
							}

							// Clears star counter animations
							clearInterval(blinkingIntervalID);
							clearInterval(blinking2IntervalID);

							// Displays modal with information about the player's performance: how long the round has lasted; the number of stars/rank achieved;
							// chosen difficulty level; and asking if the player wants to play again, while darkening all background
							setTimeout( () => {
								// Adds div with fixed position and fully displayed peel for darkening all background elements behind the modal's z-index
								document.querySelector('body').insertAdjacentHTML('afterbegin', '<div id="peel"></div>');
								// Victory Modal
								document.getElementById('msg').innerHTML = "Congratulations! You took " + totalTime + " to finish the game! And your rating was " + everyStar.length + (everyStar.length === 1 ? " star" : " stars") + ", at the " + difficulty.toUpperCase() + " difficulty!" + "<br><br>" + "Play again?";
								modalVar.style.display = "flex";
								window.addEventListener('click', hideRestart); // Hides victory modal, erases darkened background and restarts game
							}, 800);
						};
					};

						// if array.length (each difficulty level has it's own array, with it's own length) number of cards are matching its pair's symbols,
						//  displays victory modal box and runs the restarts the game all over again, in the same difficulty level
						victory();
					}
				}
			}
		});
	}
};

// Game starts at easy difficulty
window.addEventListener('DOMContentLoaded', isEasy);

// Adds event listeners for each difficulty level selection button
document.getElementById('easy').addEventListener('click', isEasy);
document.getElementById('normal').addEventListener('click', isNormal);
document.getElementById('hard').addEventListener('click', isHard);

// runs timer function after 1 second
setTimeout(timer, 1000);

// runs, every 1 second, the animation for hovering violet pointing hand icon over the difficulty level selection buttons
setInterval (movingHand, 1000);

// starts the game's logic
game();

// adds event listener for the restart button, which makes the game start over when clicked
document.querySelector('.restart').addEventListener('click', restart);