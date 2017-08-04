// const express = require('express');
// const routes = express.Router();
// const fs = require('fs')
//
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
// const word = words[Math.floor(Math.random() * words.length)];
// console.log(word);
//
// let tooMany = '';
// let guessedLetters = [];
// let wordDisplay = '';
// let numGuesses = 8;
// let msge = '';
// let alreadyGuessed = '';
// for (var i = 0; i < word.length; i++) {
//   wordDisplay += '_ ';
// let letter = req.body.letter.toLowerCase();
// }
//
// routes.get('/', (req, res, next) => {
//   function match(wordDisplay) {
//   for (let i = 0; i < letter.length; i++) {
//     if (letter[i] === wordDisplay) {
//       emptyGuess[i] = wordDisplay;
//     }
//   }
//   guessedLetters.push(wordDisplay);
//   numGuesses1--;
//   return emptyGuess;
//   }
//   function repeat() {
//     let searchGuesses = guessedLetters.slice().sort();
//     for (let i = 0; i < guessedLetters.length; i++) {
//       if (searchGuesses[i - 1] == searchGuesses[i]) {
//         guessedLetters.pop(searchGuesses[i]);
//         remainingGuesses++;
//       }
//     }
// }
// })
//
// module.exports = routes;
