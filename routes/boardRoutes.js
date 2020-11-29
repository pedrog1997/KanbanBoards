const express = require('express');
const router = express.Router();

const User = require('../model/user');
const verify = require('../middleware/verifyToken');

// Create board
router.get('/new', async (req, res) => {

});

router.post('/', async (req, res) => {

});


// Read boards
router.get('/', verify.token, async (req, res) => {
    if (req.token) {
        var user = await User.findById(req.token.userId)
        return res.render('boards', {user: user});
    }
    else {
        res.status(404);
    }
});

router.get('/:boardId', async (req, res) => {
    console.log(req.params);
    res.render("boardEdit", {
        userId: req.rootParams.userId, 
        boardId: req.params.boardId,
        taskId: 55
    });
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
