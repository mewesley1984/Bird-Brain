const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat')

const birdSchema = new Schema({
  
  birdId: {
    type: Number,
    required: true,
  },
  birdName: {
    type: String,
    required: true,
  },
  birdImage: {
    type: String,
    required: true,
  },
  birdAuthor: {
    type: String, 
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
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

