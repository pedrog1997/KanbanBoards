const express = require('express');
const router = express.Router();

const Task = require('../model/task');


// Create task
router.get('/new', async (req, res) => {

});

router.post('/', async (req, res) => {
    console.log("New task created");

    var task = new Task({Title: req.body.title, Description: req.body.description});
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
