const mongoose = require('mongoose');

const completionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: true
  }
});

// Compound index for efficient queries
completionSchema.index({ user: 1, habitId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Completion', completionSchema);
