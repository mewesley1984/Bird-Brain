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

});
const Bird = model('Bird', birdSchema);

module.exports = Bird;

