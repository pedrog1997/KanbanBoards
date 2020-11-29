const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = Schema( {
    email: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.encryptPassword =  async function(password) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password,salt);
}

UserSchema.methods.validatePassword =  async function(password) {
    return bcrypt.compare(password,this.password);
}

module.exports = model('users', UserSchema);