//boiler plate=============================
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const fs = require('fs')
const rulesRoutes = require('./routes/rules')

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


app.use((req, res, next) => {
  if (!req.session.word) {
    req.session.word;
  }
  next();
})


app.use('/', rulesRoutes)


app.listen(3000, function() {
  console.log('Success!');
});
