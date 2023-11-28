const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, trim:true },
    password: {type: String, required: true, trim: true }
});

const UserModel = new mongoose.model('user', UserSchema );

module.exports = {
    UserModel
}