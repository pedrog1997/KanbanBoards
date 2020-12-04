// Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const jwt = require("jsonwebtoken");

const config = require('./config');

require('./passportSetup');

// Express app
const app = express();

// Connection to db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/kanbanboards', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));


// Importing routes and middlewares
const indexRoutes = require('./routes/indexRouter');
const userRoutes = require('./routes/userRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRouter = require('./routes/taskRouter');
const rootParams = require('./middleware/rootParams');
const verify = require('./middleware/verifyToken');
const passport = require('passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(passport.initialize());

// Routes
app.use('/', rootParams, indexRoutes);
app.use('/users', [rootParams], userRoutes);
app.use('/users/:userId/boards', [verify.token, rootParams], boardRoutes);
app.use('/users/:userId/boards/:boardId/tasks', [verify.token, rootParams], taskRouter);


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("I AM IN GOOGLE CALL BACK FUNCTION");
        console.log(req.user);
        console.log(req.body);
        
        const token = jwt.sign({email: req.user.email, userId: req.user._id.toString()}, config.secret, {expiresIn: "1h"});
        res.cookie("token", token, {httpOnly: true});
        res.redirect('/users/' + req.user._id);
        
});

app.all('*', function(req, res) {
    res.render('notFound');
});

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
});
