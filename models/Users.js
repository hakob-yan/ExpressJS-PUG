const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        "email": {
            set: v => v.trim().toLowerCase(),
            validate: {
                validator: v => v.includes('@'),
                message: 'Error:Incorrect email'
            },
            required: true,
            type: String,
        },
        "admin": {
            type: Boolean,
            default: false
        },
        "password": String
    }
)

const Users = model('user', UserSchema)
module.exports = Users