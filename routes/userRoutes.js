const express = require('express');
const router = express.Router();

// Create user (register)
router.get('/register', async (req, res) => {

});

router.post('/', async (req, res) => {

});


// Read - Get User profile page
// Get all users only with admin privileges
router.get('/', async (req, res) => {

});

router.get('/:userId', async (req, res) => {
    res.json("user profile page");
});


// Update
router.get('/:userId/edit', async (req, res) => {
    
});

router.put('/:userId', async (req, res) => {

});


// Delete user (only website admin)
router.delete(':userId', async (req, res) => {

});

module.exports = router;