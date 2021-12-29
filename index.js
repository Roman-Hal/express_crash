const express = require('express');
const path = require('path');
//const exphbs = require('express-handlebars'); //old way
const { engine } = require('express-handlebars');
//const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// init middleware
//app.use(logger); commented out to not to use it for now

//Handlebars middleware
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//app.get('/', function(req, res){});
/*app.get('/', (req, res) => {
    res.send('<h1>Hello World!!<h1>');
});*/

/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

// Set static folder (for reference)
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
