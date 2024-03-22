const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('simulacro/Users', userSchema);

module.exports = User;