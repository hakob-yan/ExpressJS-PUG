const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        "email": String,
        "admin": Boolean,
        "password": String
    }
)

const Users = model('user', UserSchema)
module.exports = Users