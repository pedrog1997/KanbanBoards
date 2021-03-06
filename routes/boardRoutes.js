const express = require('express');
const router = express.Router();

const User = require('../model/user');
const Board = require('../model/board');
const Task = require('../model/task');
const verify = require('../middleware/verifyToken');
const { json } = require('express');

// Create board
router.post('/', verify.token, async (req, res) => {
    var {boardName, participants} = req.body;
    var participantsEmails = participants.split(",").map(item => item.trim());
    var participantsIds = []
    if (req.body.participants.length > 0) {
        for (var i = 0; i < participantsEmails.length; i++) {
            var id = await User.find({email: participantsEmails[i]}, '_id');
            participantsIds.push(id[0]._id.toString());
        }
    }
    var newBoard = new Board({
        userId: req.rootParams.userId,
        userEmail: req.token.email,
        participantsIds: participantsIds,
        participantsEmails: participantsEmails,
        boardName: boardName
    });
    await newBoard.save();
    res.redirect('/users/' + req.rootParams.userId + '/boards');
});


// Read boards
router.get('/', verify.user, async (req, res) => {
    var user = await User.findById(req.rootParams.userId);
    var ownBoards = await Board.find({userId: user._id});
    var sharedBoards = await Board.find({participantsIds: user._id});

    if (user) {
        return res.render('boards', {
            signed: true,
            localUser: user,
            user: user,
            ownBoards: ownBoards,
            sharedBoards: sharedBoards
        });
    }
    else {
        res.render('notFound');
    }
});

router.get('/:boardId', verify.token, async (req, res) => {
    console.log(req.params);

    if (!req.token) {
        res.redirect('/login');
    }
    var localUser = await User.findById(req.token.userId);
    var user = await User.findById(req.rootParams.userId);
    var board = await Board.findById(req.params.boardId);

    // verify
    console.log("Verify user or participant");
    console.log(board.userId);
    console.log(req.rootParams.userId);
    console.log(board.participantsIds.includes(req.rootParams.userId));
    if (!(board.userId == localUser._id || board.participantsIds.includes(req.rootParams.userId))) {
        return res.render('accessDenied');
    }

    var todo = await Task.find({boardId: req.params.boardId, status: 'todo'});
    var inprogress = await Task.find({boardId: req.params.boardId, status: 'inprogress'});
    var done = await Task.find({boardId: req.params.boardId, status: 'done'});
    console.log(user);
    console.log(board);
    if (user && board) {
        res.render('board', {
            signed: true,
            localUser: localUser,
            user: user,
            board: board,
            todo: todo,
            inprogress: inprogress,
            done: done
        });
    }
    else {
        res.render('notFound');
    }
});


// Update board
router.put('/:boardId', [verify.token, verify.user], async (req, res) => {
    var {boardName, participants} = req.body;
    var participantsEmails = participants.split(",").map(item => item.trim());
    var participantsIds = []
    console.log("Request body");
    console.log(req.body);
    for (var i = 0; i < participantsEmails.length; i++) {
        var id = await User.find({email: participantsEmails[i]}, '_id');
        if (id[0]) {
            participantsIds.push(id[0]._id.toString());
        }
    }
    var updateBoard = {
        userId: req.rootParams.userId,
        userEmail: req.token.email,
        participantsIds: participantsIds,
        participantsEmails: participantsEmails,
        boardName: boardName
    }
    await Board.findOneAndUpdate({_id: req.params.boardId}, updateBoard);

    res.redirect('/users/' + req.rootParams.userId + "/boards");
});


// Delete board
router.delete('/:boardId', async (req, res) => {
    await Board.deleteOne({_id: req.params.boardId});

    res.redirect('/users/' + req.rootParams.userId + "/boards");
});


module.exports = router;
