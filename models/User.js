const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    created_at: {
        default: Date.now,
        type: Date
    },
    profile: {type: ObjectId, ref: 'Profile'},
})

const User = mongoose.model('User', UserSchema);

module.exports = User;