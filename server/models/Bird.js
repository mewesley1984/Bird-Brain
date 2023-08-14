const { Schema, model } = require('mongoose');

const birdSchema = new Schema({
  
  description: {
    type: String,
    required: true,
  },
  birdId: {
    type: String,
    required: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],

});
const Bird = model('Bird', birdSchema);

module.exports = Bird;



// const { Schema, model } = require('mongoose');

// const commentSchema = new Schema({
//     text: {
//         type: String,
//         required: true,
//     },
//     bird: {
//         type: Schema.Types.ObjectId, 
//         ref: 'Bird',
//         required: true
//     },
//     user: {
//         type: Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//     },
//     datePosted: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Comment = model('Comment', commentSchema);

// module.exports = Comment;

// will need to add under birdId