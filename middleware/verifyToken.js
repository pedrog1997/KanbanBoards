const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyToken(req, res, next) {
    console.log("Verify token");
    const token = req.cookies.token || '';

    if (!token) {
        req.token = null;
        next();
    }
    else {
        jwt.verify(token,config.secret, function(err,decoded){
            if (err){
                console.log(err);
                req.token = null;
                next();
            }
            else {
                req.token = decoded;
                next();
            }
        });
    }
}

// Verifies that the userId parameter in url is the same as the token´s userid
function verifyUser(req, res, next) {
    console.log("Verify user");
    const token = req.cookies.token || '';

    if (!token) {
        res.redirect('/login');
    }
    else {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log(err);
                return res.redirect("/login");
            }
            else {
                if (decoded.admin) {
                    console.log("Admin access");
                    next();
                }
                if (decoded.userId == req.params.userId) {
                    next();
                }
                else {
                    res.json("You do not have access to this page");
                }
            }
        });
    }
}

// Verifies if user is admin
function verifyAdmin (req, res, next) {
    console.log("Verify admin");
    const token = req.cookies.token || '';

    if (!token) {
        res.redirect('/login');
    }
    else {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log(err);
                return res.redirect('/login');
            }
            else {
                if (decoded.admin) {
                    next();
                }
                else {
                    res.json("You do not have acess to this page");
                }
            }
        });
    }
}

module.exports = {token: verifyToken, user: verifyUser, admin: verifyAdmin};