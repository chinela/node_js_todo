const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const TodoSchema = Schema({
    title: {
        required: true,
        type: String
    },
    isCompleted: {
        default: false,
        type: Boolean
    },
    created_at: {
        default: Date.now,
        type: Date
    },
    user: {type: ObjectId, ref: 'User'},
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;