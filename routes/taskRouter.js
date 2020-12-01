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


// Read tasks
router.get('/', async (req, res) => {
    res.json(req.rootParams);
});

router.get('/:taksId', async (req, res) => {

});


// Update task (Move from list to list (to-do, in progress, done))
router.get('/:taskId/edit', async (req, res) => {

});

router.put('/:taskId', async (req, res) => {

});


// Delete task
router.delete('/:taskId', async (req, res) => {

});


module.exports = router;
