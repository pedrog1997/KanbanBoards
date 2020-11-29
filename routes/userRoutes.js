const { render } = require('ejs');
const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

const config = require('../config');
const User = require('../model/user');
const verify = require('../middleware/verifyToken');

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
    
    const token = jwt.sign({email: user.email, userId: user._id}, config.secret, {expiresIn: "1h"});
    res.cookie("token", token, {httpOnly: true});


    res.redirect("/users/" + user._id);
});


// Read - Get User profile page
// Get all users only with admin privileges
router.get('/', [verify.admin], async (req, res) => {
    res.json("/users/");
});
// Public to all users
router.get('/:userId', [verify.token], async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, config.secret, function(err, decoded) {
        console.log(decoded);
        res.render("userProfile", {email: decoded.email});
    });
    
});


// Update
router.get('/:userId/edit', [verify.token, verify.user], async (req, res) => {
    res.json("/users/" + req.params.userId + "/edit");
});

router.put('/:userId', [verify.token, verify.user], async (req, res) => {

});


// Delete user (only website admin)
router.delete(':userId', [verify.admin], async (req, res) => {

});

module.exports = router;
