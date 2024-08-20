const Submission = require('../models/submission'); 
const Question = require('../models/question');

const createSubmission = async (req, res) => {
  try {
    const { testId, selections, endedAt } = req.body;
    userId="66c1f9c0d3efae11bdb51619"

    const submission = new Submission({
      testId,
      userId,
      selections,
      endedAt,
    });

  
    await submission.save();

    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSubmission,
};