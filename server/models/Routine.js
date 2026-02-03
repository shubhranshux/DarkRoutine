const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    default: '#C5CDD5'
  },
  enabled: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Routine', routineSchema);
