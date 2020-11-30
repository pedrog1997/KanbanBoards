const { ObjectID } = require("bson");
const {Schema, model} = require("mongoose");

const TaskSchema = Schema( {
    authorEmail: String,
    boardId: String,
    status: String, // todo, inprogress, done
    title: String,
    description: String
});

module.exports = model('tasks', TaskSchema);
