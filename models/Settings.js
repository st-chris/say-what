const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  difficulty: {
    1: { type: Boolean, default: true },
    2: { type: Boolean, default: true },
    3: { type: Boolean, default: true },
    4: { type: Boolean, default: true },
    5: { type: Boolean, default: true },
    6: { type: Boolean, default: true },
    more: { type: Boolean, default: true }
  },
  voice_speed: { type: Number, default: 1 }
});

module.exports = Settings = mongoose.model('settings', SettingsSchema);
