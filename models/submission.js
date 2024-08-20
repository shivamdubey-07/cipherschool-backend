const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const submissionSchema = new mongoose.Schema({
  testId: {
    type: ObjectId,
    ref: 'Test',
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  selections: [{
    questionId: {
      type: ObjectId,
      ref: 'Question',
      required: true,
    },
    option: {
      type: String,
      required: true,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  endedAt: {
    type: Date,
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  wrongAnswers: {
    type: Number,
    default: 0,
  },
  isEvaluated: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});


const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
