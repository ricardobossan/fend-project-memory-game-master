# Matching Game

![App view][0]

## Credits and Acknowledgement

Favicon icon obtained at: ``https://www.favicon-generator.org/``

Logic for the `myTimer()` function, in `app.js`file, obtained at: ``https://teamtreehouse.com/community/i-dont-understand-one-piece-of-code``

I would like to give my sincere thanks to my Udacity's mentor Jai, for the support and encouragement.

I Also would like to express my gratitude to the following, for testing my code's usability and bringing me suggestions for improving it: My parents Harley and Deise Bossan, my girlfriend Amanda Schwarz, my friends Sergio Schwarz, Aluisio Maia, Oyama Scharra, Farney Paixao and Rafael Montenegro.

## How The Game Works

### Game Start

The Matching Game is a Web App and should run automatically, once it's URL is accessed or it's HTML file is oppened.

### How To Play

The game is composed of a deck of cards. Each pair of cards contains a different symbol in it's center. The game starts with all cards turned up, showing their symbols, for 4 seconds. In this time, the player has to memorize as many cards symbols as possible. After this, all cards are turned down, and the player has to touch/click each one to turn it up. Each pair of cards the player turns up counts as 1 move by the player. At each move made by the player (2 cards turned up), the player has to try and turn up a pair of cards holding the same symbol. If a pair of cards, holding the same symbol, is turned up in the same move, these 2 cards stay turned up for the rest of the game, and cannot be turned down anymore. But if the symbols on the pair of cards turned up in the same move don't match, then these 2 cards are turned back down, and the player has to try again in the next move. The objective of the Matching Game is to, one move at a time (every pair of cards turned up), turn up all the pairs of cards that hold the same symbol, until there's no card left to be turned up!

Upon victory, a message is displayed on screen, congratulating the player, showing how long the game has lasted, the number of stars the player got and asking if the player wants to play again. At this moment, if any part of the content displayed by the browser is clicked/touched, the game will restart from scratch.

There is also a restart button for starting the game from scratch, one the same difficulty level previouslly selected by the player. It's the button with the rotating arrow icon on it.

### Star Ranking System

The player starts the game with 3 stars. At certain move number intervals (this amount will vary with each difficulty level), the player will lose 1 star. If all intervals of moves are met by the player, the player will have zero stars as his ranking.

### Difficulty Levels

There are 3 difficulty settings for the player to choose between in the Matching Game: `Easy`, `Normal` and `Hard`. The `Easy` difficulty is selected by default, once the browser content is first loaded or the browser is refreshed. The player can change the game's difficulty setting at anytime, by clicking on the buttons, each respectively displaying a difficulty level name. Those buttons are always displayed on the screen, and may change the game's difficulty setting at anytime. The `Easy` difficulty setting displays a deck of 16 cards, and player loses 1 star each at 14, 20 and 25 moves. The `Normal` difficulty setting, 20 cards, lose stars at 19, 25 and 30 moves. And the `Hard`, 24 cards, loses stars at 24, 30 and 35 moves.

[0]:/img/app.png