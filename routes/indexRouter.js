const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

const config = require("../config");
const User = require('../model/user');

const verify = require('../middleware/verifyToken');

// Welcome page
router.get('/', verify.token, async (req, res) => {
    if (req.token) {
        var user = await User.findById(req.token.userId)
        console.log(user);
        return res.render('index', {
            signed: true,
            localUser: user,
            user: user
        });
    }
    else {
        res.render('index', {signed: false, user: null});
    }
});

router.get('/about', verify.token, async (req, res) => {
    if (req.token) {
        var user = await User.findById(req.token.userId)
        return res.render('about', {signed: true, localUser:user, user: user});
    }
    else {
        res.render('about', {signed: false, user: null});
    }
});

router.get('/login', verify.token, async (req, res) => {
    if (req.token) {
        var user = await User.findById(req.token.userId)
        if (!user) {
            res.json("User not found");
        }
        return res.render('login', {signed: true, localUser:user, user: user});
    }
    else {
        console.log("login without token");
        res.render('login', {signed:false, user: null});
    }
});

router.post('/login', async (req, res) => {
    var {email, password} = req.body;

    const user = await User.findOne({email: email});

    if (!user) {
        return res.status(404).send("The user does not exist");
    }
    else {
        const valid = await user.validatePassword(password);
        if (valid) {
            var token;
            if (user.admin) {
                token = jwt.sign({email: user.email, userId: user._id, admin: true}, config.secret, {expiresIn: "1h"});
            }
            else {
                token = jwt.sign({email: user.email, userId: user._id}, config.secret, {expiresIn: "1h"});
            }
            res.cookie("token", token, {httpOnly: true});
            res.redirect("/users/" + user._id + "/boards");
        }
        else {
            res.status(401).send("Incorrect password");
        }
    }
    
});

router.post('/logout', async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});



module.exports = router;
