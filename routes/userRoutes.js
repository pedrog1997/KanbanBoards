const { render } = require('ejs');
const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

const config = require('../config');
const User = require('../model/user');
const verify = require('../middleware/verifyToken');
const { token } = require('morgan');

// Create user (register)
router.get('/register', verify.token, async (req, res) => {
    console.log("Estoy en /users/register");
    if (req.token) {
        var user = await User.findById(req.token.userId)
        return res.render('register', {signed:true, user: user});
    }
    else {
        res.render('register', {signed:false, user: null});
    }
});

router.post('/', async (req, res) => {
    var user = new User(req.body);
    console.log(user);
    user.password = await user.encryptPassword(user.password);
    await user.save();
    
    const token = jwt.sign({email: user.email, userId: user._id.toString()}, config.secret, {expiresIn: "1h"});
    res.cookie("token", token, {httpOnly: true});


    res.redirect("/users/" + user._id);
});


// Read - Get User profile page
// Get all users only with admin privileges
router.get('/', [verify.token], async (req, res) => {
    if (req.token) {
        var localUser = await User.findById(req.token.userId);
        var users = await User.find();
        res.render('users', {signed: true, localUser: localUser, users: users});
    }else {
        res.redirect('/login');
    }
});
// Public to all users
router.get('/:userId', [verify.token], async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.render('notFound');
    }
    else {
        if (req.token) {
            console.log("Token");
            console.log(req.token);
            var localUser = await User.findById(req.token.userId);
            return res.render("userProfile", {signed:true, localUser: localUser, user: user});
        }else {
            return res.render("userProfile", {signed:false, user: user});
        }
    }
});

// Update
router.put('/:userId', [verify.token, verify.user], async (req, res) => {
    var id = req.params.userId;
    await User.update({_id: id}, req.body);
    res.redirect("/users/" + id);
});


// Delete user (only website admin)
router.delete(':userId', [verify.admin], async (req, res) => {

});

module.exports = router;
