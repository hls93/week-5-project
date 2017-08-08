const express = require('express');
const routes = express.Router();
const fs = require('fs')

//assign values=============================
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let word = words[Math.floor(Math.random() * words.length)];
console.log(word);
let tooMany = '';
let guessedLetters = [];
let wordDisplay = '';
let numGuesses = 8;
let msge = '';
let alreadyGuessed = '';
for (var i = 0; i < word.length; i++) {
  wordDisplay += '_';
}

routes.get('/', function(req, res) {
  content = {
    tooMany: tooMany,
    guessedLetters: guessedLetters,
    wordDisplay: wordDisplay,
    numGuesses: numGuesses,
    alreadyGuessed: alreadyGuessed,
    msge: msge
  }
  res.render('home', content)
})

routes.post('/', function(req, res) {
  let letter = req.body.letter.toLowerCase();
  //send an error message if a letter is guessed more than once
  if (guessedLetters.includes(letter)) {
    alreadyGuessed = 'You already guessed this letter, try again';
  } else {
    alreadyGuessed = '';
  }
  //if they guessed letter already, don't take away a turn
  let index = word.indexOf(letter);
  if (index === -1) {
    if (guessedLetters.includes(letter)) {
      numGuesses++;
    }
    numGuesses--;
  }
  guessedLetters.push(letter);


  while (index > -1) {
    wordDisplay = wordDisplay.substr(0, index) + letter + wordDisplay.substr(index + 1);
    index = word.indexOf(letter, index + 1);
    tooManyLetters = '';
  }
// let wordarray = word.split('');
// let wordDisplayArray = wordDisplay.split('');
//
// wordarray.forEach(function(value, i) {
//   if (value === letter){
//     wordDisplayArray[i] = value;
//   }
// });
//
// word = wordarray.join('');
// wordDisplay = wordDisplayArray.join(' ');

  //if guess is too long, display error
  if (letter.length > 1) {
    letter = '';
    numGuesses++;
    tooManyLetters = 'Only one letter at a time is allowed'
  } else {
    tooManyLetters = '';
  }

  //if they use all 8 guesses
  if (numGuesses < 1) {
    msge = 'You lost!'
  }


  res.redirect('/');
});


module.exports = routes
