// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');

// Express app
const app = express();

// Connection to db
mongoose.connect('mongodb://localhost/kanbanboards',{
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

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/', rootParams, indexRoutes);
app.use('/users', [rootParams], userRoutes);
app.use('/users/:userId/boards', [rootParams, verify.token], boardRoutes);
app.use('/users/:userId/boards/:boardId/tasks', [rootParams, verify.token], taskRouter);

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})
