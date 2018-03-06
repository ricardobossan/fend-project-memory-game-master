# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

# JS Code

## Global Variables

```const deck = document.querySelector('.deck'),
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
```
## Functions

Makes the violet hand hovering above the easy difficulty option visible by the beggining of the game (which starts set to `easy` - see line 55
handStyle.item(0).style.visibility = 'visible';


### 3 Difficulty Setting Functions

The following blocks of functions (`isEasy`, `isnormal` and `isHard`) switch between difficulty levels upon click, changing the number of cards, it's symbols and number of moves necessary to lose stars/rank.Each of these difficulty setting functions hides the two other violet hand pointer at the top of each displayed difficulty option. Make the one above the displayed chosen difficulty levelFunction restart is called at the end of each of this difficulty blocks:

```
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
```


### Shuffle Cards Function

Shuffle function from http://stackoverflow.com/a/2450976

Fisher-Yates Algoritm (Udacity's FEND version):


```
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
```

### Hide Cards Function

Hides all card's symbols, shown for 4 seconds on game start (by the `generate` function - line 201):

```
function hideCards () {
	setTimeout(function() {
	let element = 0;
		for (let t = 0; t < document.querySelectorAll('.card').length; t++) {document.querySelector('.deck').children[t].classList.remove("open", "show")};;
	}, 4000);
}
```

### Generate Cards Function

Creates a shuffled deck (`.deck`), that displays all cards symbols, then hides them with the `hideCards()` callback function:

```
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
```

### Timer Function

Logic for timer, located on top-right corner of the browser window:

```
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
```

### Moves Counter Function

display the number of moves on the move counter (.moves):

```
const moveCounter = function () {
	move++;
	moveNum.innerHTML = move <= 1 ? move + " Move" : move + " Moves";
}
```

### Star Counter Function

logig for removing each star/rank at a certain sucessive number of moves (different number required for each difficulty setting):

```
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
```

### Animated Hand Pointer Function

Function for calling animation on the pointing violet hand, at intervals of 1 second, which will be set further down the code bellow:

```
const movingHand = function() {
	handStyle.item(0).classList.toggle('hand-dancing');
	handStyle.item(1).classList.toggle('hand-dancing');
	handStyle.item(2).classList.toggle('hand-dancing');

}
```

### Blinking Red Star Counteer Function

function with the logic for starting the slower (.blink-1) red blinking star counter, when stars/ranking number reaches 2 stars. Intervals will be se further down the code bellow:

```
let blinking = function () {
	if (difficulty === "easy" ? move >= 14 && move < 19 : difficulty === "normal" ? move >= 19 && move < 25 : move >= 29) {
		starNum.classList.toggle('blink-1');
	}	
}
```

### Blinking Red Star Counteer Function 2

Function for faster (`.blink-2`) red blinking star counter field, at given intervals, to be set further down bellow, and removing the `.blink-1` animation. Does the same for the class `.blink-3`:

```
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
```

### Victory Function (Modal Function)

Display victory message after the array.length number of cards are matched (each difficulty level has it's own array, with different number of elements and, therefore, length), with a wait of 800 milliseconds:

```
const victory = function () {
	if (document.getElementsByClassName('match').length === arrays.length) {
		let gameEnd = Date.now();		
		let gameTime = gameEnd - gameStart;		
		let seconds = gameTime / 1000; // from milliseconds to seconds``
		
		//logic for respecting concordance between singular and plural words and numbers (avoid errors like `1 seconds`, or `1 minutes`) in modal shown upon victory, displayin how long the game as lasted (along with other information about the player's performance). It's the same logic for all difficulty levels
		// if game took 60 of more seconds
		if (seconds >= 60) {
			// if game has round minutes, and no seconds
			if (Math.floor(seconds % 60) === 0) {
				//if game has 1 perfect minute, displays it make sure message shown as singular concordance
				if (Math.floor(seconds) === 60) {
					totalTime = `1 minute`;
				// if has 2 or more perfect minutes, message with plural concordance
				} else {
					totalTime = `${Math.floor(seconds / 60)} minutes`;
				}
			// same logic as the correspondent if statement, but with 1 second after minute, wich makes it a singular concordance second
			} else if (Math.floor(seconds % 60) === 1) {
				if (Math.floor(seconds) === 61) {
					totalTime = `1 minute and 1 second`;			
				} else {
					totalTime = `${Math.floor(seconds / 60)} minutes and 1 second`;
				}
			// plural concordance for plural minutes and seconds
			} else {
				totalTime = `${Math.floor(seconds / 60)} minutes and ${Math.floor(seconds % 60)} seconds`;
			}			
		// less than one minute. No game will last 1 second, so respective statement uncessary, obviously
		} else {
			totalTime = `${Math.floor(seconds)} seconds`;
		}


		// displays modal with information about the player's performance: how long the round has lasted; the number of stars/rank achieved; chosen difficulty level; and asking if the player wants to play again.
		setTimeout(function() {
			window.alert("Congratulations! You took " + totalTime + " to finish the game! And Your rating was " + everyStar.length + (everyStar.length === 1 ? " star" : " stars") + ", at the " + difficulty.toUpperCase() + " difficulty!\n\nPlay again?");
		}, 800);

		// if array.length cards are matching - which means the game is over - restarts game automatically, after waiting 1 second
		setTimeout(function() {
			restart();
		}, 1000);
	};
}
```

### Restart Button function

```
const restart = function () {
	
	//erases previouslly dinamically generated js code, so it can start from 0, upon new round
	s = 0;
	m = 0;
	h = 0;
	gameStart = "";
	gameEnd = "";
	gameTime = 0;
	seconds = 0;
	totalTime = 0;
	move = 0;
	deck.innerHTML = "";
	timerCounter = "00 : 00 : 00";
	starNum.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	moveNum.innerHTML = "0 Moves";

	//erases previouslly generated array list for open cards (`.open`) and for matching card pairs (`.match`)
	open.splice(0, open.length);
	match.splice(0, match.length);
	starNum.classList.remove('blink-1', 'blink-2', 'blink-3');
		
	//generate new shuffled array and begins game's logic again
	generate();
	game();
}
```

### Game Function

Logic for the game. It moves cards between the `open` and `match`arrays, and adds, removes or toggles it's classes (`.open`, `.show` and `.match`):

```
const game = function() {

	// stores the time the game started
	gameStart = Date.now();

	//adds a click event for every card
	for (let i = 0; i < everyCard.length; i++) {
		everyCard.item(i).addEventListener('click', function () {

			// Prevents matching the same card upon double click: checks if the open array item of index `i`, to be added in this iteration, holds the same symbol as the one provided in the previous iteration (`i - 1`). If it doesn't, then the code proceds to check if a pair of clicked cards matches or not the same symbol.
			if (!open.includes(everyCard.item(i))) {

				// when a third card is clicked/iterated, and, therefore, turned open, the first two are turned down and have their symbols hidden; while leaving a third card (from last iteration) turned open, to see if it matches the next card to be turned open upon the subsequent click/iteration, or if it doesn't match, which would have this processes repeated over (in another words, this step removes the `.open` and `show´ classes from the first two iterated cards added to the open array list, and then removes those cards from the list altogheter, leaving the third one with those two classes, remaining in the open array)
				if (open.length >= 2) {
					open[0].classList.remove("open", "show");
					open[1].classList.remove("open", "show");		
					open.splice(0, 2);
				}
				// Reveals a card on click, adding them to the `open` array list
				open.splice(0, 0, everyCard.item(i));
				open[0].classList.add("open", "show");

				// checks if 2 cards are  in the open array (one added to this array in the last click/iteration, and the other added on the present click/iteration)
				if (open.length === 2) {
					
					// calls the functions that updates the  move and star counters each time a pair of cards is turned
					moveCounter();
					starCounter();
					
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

						// if array.length (each difficulty level has it's own array, with it's own length)number of cards are matching its symbols, displays victory alert box and runs the `restart` function, starting the game all over again, in the same difficulty level
						victory();
					}
				}
			}
		});
	}
}
```

## Event Listeners & Call Functions

Calls function to create deck of shuffled cards:

`generate();`

Adds event listeners for each difficulty level selection button:

```
document.getElementById('easy').addEventListener('click', isEasy);
document.getElementById('normal').addEventListener('click', isNormal);
document.getElementById('hard').addEventListener('click', isHard);
```

runs timer function after 1 second:

``setTimeout(timer, 1000);``

Runs, every 1 second, the animation for violet pointing hand icon over the difficulty level selection buttons:

``setInterval (movingHand, 1000);``

If 2 or 1 stars, blinks red, if 0 stars, stays red:

``setInterval (blinking, 1900);``

``setInterval (blinking2, 600);``



Starts the game's logic:

`game();`

Adds event listener for the restart button, which makes the game start over when clicked:

``document.querySelector('.restart').addEventListener('click', restart);``

The end
---
