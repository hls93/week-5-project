//boiler plate=============================
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const fs = require('fs')

const app = express();

// tell express to use handlebars
app.engine('handlebars', exphbs());
app.set('views', './views');
app.set('view engine', 'handlebars');

//tell express to use public folder
app.use(express.static('public'));

//tell express to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//tell express to use validator
app.use(expressValidator());

// configure session support middleware with express-session
app.use(
  session({
    secret: 'donuts',
    resave: false,
    saveUninitialized: true
  })
);

//assign values=============================
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const word = words[Math.floor(Math.random() * words.length)];
console.log(word);
let tooMany = '';
let guessedLetters = [];
let wordDisplay = '';
let numGuesses = 8;
let msge = '';
let alreadyGuessed = '';
for (var i = 0; i < word.length; i++) {
  wordDisplay += '_ ';
}

//get and post and establish game rules========
app.use((req, res, next) => {
  if (!req.session.word) {
    req.session.word;
  }
  next();
})

app.get('/', function(req, res) {
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

app.post('/', function(req, res) {
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


  if (index > 0) {

  }

  while (index > -1) {
    wordDisplay = wordDisplay.substr(0, index) + letter + wordDisplay.substr(index + 1);
    index = word.indexOf(letter, index + 1);
    // tooManyLetters = '';
  }

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





app.listen(3000, function() {
  console.log('Success!');
});
