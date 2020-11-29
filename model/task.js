const { ObjectID } = require("bson");
const {Schema, model} = require("mongoose");

const TaskSchema = Schema( {
    authorId: String,
    boardId: String,
    status: String, // to-do, in-progress, done
    Title: String,
    Description: String
});

module.exports = model('tasks', TaskSchema);
