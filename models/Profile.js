const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  words: { type: Object },
  stats: {
    words: { type: Number, default: 0 },
    correct: { type: Number, default: 0 }
  },
  awards: [
    {
      award: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'award'
      },
      date: Date
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
