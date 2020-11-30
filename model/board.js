const {Schema, model} = require("mongoose");

const BoardSchema = Schema( {
    userId: String,
    participants: [String],
    boardName: String,
});

module.exports = model('boards', BoardSchema);
