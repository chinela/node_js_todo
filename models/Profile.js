const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfileSchema = Schema({
    first_name: String,
    last_name: String,
    phone_number: String,
    id: ObjectId,
    user: {type: ObjectId, ref: 'User'}
})

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;