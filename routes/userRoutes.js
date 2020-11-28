const { render } = require('ejs');
const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

const config = require('../config');
const User = require('../model/user');

// Create user (register)
router.get('/register', async (req, res) => {
    console.log("Estoy en /users/register");
    res.render('register');
});

router.post('/', async (req, res) => {
    var user = new User(req.body);
    console.log(user);
    user.password = await user.encryptPassword(user.password);
    await user.save();
    
    const token = jwt.sign({email: user.email}, config.secret, {expiresIn: "1h"});
    res.cookie("token", token, {httpOnly: true});


    res.redirect("/users/" + user._id);
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
