const express = require('express');
const router = express.Router();


// Create board
router.get('/new', async (req, res) => {

});

router.post('/', async (req, res) => {

});


// Read boards
router.get('/', async (req, res) => {
    res.reder("boardEdit");
});

router.get('/:boardId', async (req, res) => {

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
