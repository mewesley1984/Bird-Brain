const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    bird: {
        type: Schema.Types.ObjectId, 
        ref: 'Bird',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;

// comments can be included in Bird schema. refer to activity 24 in MERN module under Thought.js model