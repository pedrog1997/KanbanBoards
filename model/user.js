const {Schema, model} = require("mongoose");

const UserSchema = Schema( {
    userName: String,
    email: String,
    password: String
});

module.exports = model('users', UserSchema);