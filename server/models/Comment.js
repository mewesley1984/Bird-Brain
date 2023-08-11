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
    datePosted: {
        type: Date,
        default: Date.now,
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;