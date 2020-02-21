const mongoose = require('mongoose');

const WordsSchema = new mongoose.Schema({
  a: [String],
  b: [String],
  c: [String],
  d: [String]
});

module.exports = Words = mongoose.model('words', WordsSchema);
