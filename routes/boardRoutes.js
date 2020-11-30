const express = require('express');
const router = express.Router();

const User = require('../model/user');
const Board = require('../model/board');
const Task = require('../model/task');
const verify = require('../middleware/verifyToken');

// Create board
router.get('/new', async (req, res) => {

});

router.post('/', async (req, res) => {

});


// Read boards
router.get('/', async (req, res) => {
    var user = await User.findById(req.rootParams.userId);
    if (user) {
        return res.render('boards', {user: user});
    }
    else {
        res.status(404).send("User not found");
    }
});

router.get('/:boardId', async (req, res) => {
    console.log(req.params);
    var user = await User.findById(req.rootParams.userId);
    var board = await Board.findById(req.params.boardId);
    var todo = await Task.find({boardId: req.params.boardId, status: 'todo'});
    var inprogress = await Task.find({boardId: req.params.boardId, status: 'inprogress'});
    var done = await Task.find({boardId: req.params.boardId, status: 'done'});
    console.log(user);
    console.log(board);
    if (user && board) {
        res.render('board', {
            user: user,
            board: board,
            todo: todo,
            inprogress: inprogress,
            done: done
        });
    }
    else {
        res.status(404).send("404 Not found");
    }
});


// Update board
router.get('/:boardId/edit', async (req, res) => {

});

router.put('/:boardId', async (req, res) => {

});


// Delete board
router.delete('/:boardId', async (req, res) => {

});


module.exports = router;
