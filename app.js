const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

//  Load routes
const clients = require('./routes/clients');
const users = require('./routes/users');

//  Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//  Static folder
app.use(express.static(path.join(__dirname, 'public')));

//  Index route
app.get('/', (req, res) => {

    res.render('index');
});

//  About Route
app.get('/about', (req, res) => {

    res.render('about');
});

//  Use routes
app.use('/clients', clients);
app.use('/users', users);

const port = process.env.PORT || 8000;

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
});