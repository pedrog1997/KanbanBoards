const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

const config = require("../config");
const User = require('../model/user');

// Welcome page
router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/about', async (req, res) => {
    res.render('about');
});

router.get('/login', async (req, res) => {
    res.render('login');
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
            const token = jwt.sign({email: user.email}, config.secret, {expiresIn: "1h"});
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
