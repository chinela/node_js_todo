const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfileSchema = Schema({
    name: String,
    phone: String,
    id: ObjectId,
    user_id: String,
    user: {type: ObjectId, ref: 'User'}
})

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;