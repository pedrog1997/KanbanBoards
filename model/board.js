const {Schema, model} = require("mongoose");

const BoardSchema = Schema( {
    userId: String,
    userEmail: String,
    participantsIds: [String],
    participantsEmails: [String],
    boardName: String,
});

module.exports = model('boards', BoardSchema);
