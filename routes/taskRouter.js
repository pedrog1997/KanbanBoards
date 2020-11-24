const express = require('express');
const router = express.Router();


// Create task
router.get('/new', async (req, res) => {

});

router.post('/', async (req, res) => {

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
