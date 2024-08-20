const mongoose = require('mongoose');
const Question = require('./question'); 

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', 
    required: true,
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
