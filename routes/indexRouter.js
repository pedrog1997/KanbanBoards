const express = require('express');
const router = express.Router();

// Welcome page
router.get('/', async (req, res) => {
    res.render('Welcome page');
});

router.get('/about', async (req, res) => {

});

router.get('/login', async (req, res) => {

});

router.get('/logout', async (req, res) => {

});


module.exports = router;
