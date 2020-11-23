// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Express app
const app = express();

// Connection to db
mongoose.connect('mongodb://localhost/kanbanboards',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));


// Importing routes


// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Routes


app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})
