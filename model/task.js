const { ObjectID } = require("bson");
const {Schema, model} = require("mongoose");

const TaskSchema = Schema( {
    authorId: String,
    boardId: String,
    status: String,
    Title: String,
    Description: String
});

module.exports = model('users', UserSchema);
