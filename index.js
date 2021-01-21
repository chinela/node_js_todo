const express = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
const app = express();

mongoose.connect('mongodb://localhost/todo_app', {useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    
}).on('err', err=> {
    console.log(err);
})

// This is used to set the static pages
app.use('/', express.static('public'));

// This is used to set the view engine
app.use(expressLayouts);
app.set('layout', './layouts/main-layout')
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.app_name = process.env.APP_NAME
    res.locals.error = req.flash('error');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.url_path = req.originalUrl
    next();
})

// Start of all routers file
app.use('/', require('./routes/web'));
app.use('/', require('./routes/user'));
// End of all routers file

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port: ` + port);
});
