const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

//  Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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

const port = process.env.PORT || 8000;

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
});