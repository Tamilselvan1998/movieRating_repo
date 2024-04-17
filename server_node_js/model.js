const mongoose = require('mongoose');
 
const movieSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  comments: {
    type: [String],
    default: []
  },
});
 
const Movie = mongoose.model('Movie', movieSchema);
 
module.exports = Movie;