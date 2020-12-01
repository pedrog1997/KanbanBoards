const express = require('express');
const router = express.Router();

const Task = require('../model/task');


// Create task
router.post('/', async (req, res) => {
    console.log("New task in creation");
    console.log("New task post req.body: ");
    console.log(req.body);

    var task = new Task({
        authorEmail: req.body.userEmail,
        boardId: req.rootParams.boardId,
        status: req.body.status,
        title: req.body.title, 
        description: req.body.description
    });
    await task.save();

    res.redirect('/users/' + req.rootParams.userId + "/boards/" + req.rootParams.boardId);
});


// Update task (Move from list to list (to-do, in progress, done))
router.put('/:taskId', async (req, res) => {
    var task = {
        authorEmail: req.body.userEmail,
        boardId: req.rootParams.boardId,
        status: req.body.status,
        title: req.body.title,
        description: req.body.description
    };

    await Task.findOneAndUpdate({_id: req.params.taskId}, task);

    res.redirect('/users/' + req.rootParams.userId + '/boards/' + req.rootParams.boardId);
});


// Delete task
router.delete('/:taskId', async (req, res) => {
    await Task.deleteOne({_id: req.params.taskId});

    res.redirect('/users/' + req.rootParams.userId + '/boards/' + req.rootParams.boardId);
});


module.exports = router;
