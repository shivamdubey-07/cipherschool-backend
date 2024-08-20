const Test = require('../models/test');
const Submission = require('../models/submission');
const Question=require("../models/question");
exports.createTest = async (req, res) => {
    try {
      const { title, description, questions } = req.body;
      console.log(title, description, questions)
  
     
      const existingTest = await Test.findOne({ title });
      if (existingTest) {
        return res.status(400).json({ message: 'Test with this title already exists' });
      }
      const questionIds = [];
      for (const q of questions) {
        const newQuestion = new Question({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          testId: null, 
          marks: q.marks,
        });
        await newQuestion.save();
        questionIds.push(newQuestion._id);
      }
  

      const newTest = new Test({
        title,
        description,
        questions: questionIds,
      });
      await newTest.save();
 
      await Question.updateMany(
        { _id: { $in: questionIds } },
        { $set: { testId: newTest._id } }
      );
  
      res.status(201).json({ message: 'Test created successfully', test: newTest });
    } catch (error) {
      res.status(500).json({ message: 'Error creating test', error: error.message });
    }
  };


exports.getTestResults = async (req, res) => {
  try {
    const { testId } = req.params;

    const results = await Submission.find({ testId });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test results', error: error.message });
  }
};

exports.getTests = async (req, res) => {
    try {
    
      const tests = await Test.find({ isDeleted: false });
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tests', error: error.message });
    }
  };


exports.deleteTest = async (req, res) => {
    try {
      const { testId } = req.params;
  
      const result = await Test.findByIdAndUpdate(testId, { isDeleted: true }, { new: true });
  
      if (!result) {
        return res.status(404).json({ message: 'Test not found' });
      }
  
      res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting test', error: error.message });
    }
  };

  exports.searchTestsByName = async (req, res) => {
    console.log("i am here")
    const { name } = req.query;
    console.log("test",name)
  
    if (!name) {
      return res.status(400).json({ message: 'Test name is required.' });
    }
  
    try {
   
      const tests = await Test.find({ title: new RegExp(name, 'i') }); 
    
      res.json({title:tests[0].title,description:tests[0].description,questions:tests[0].questions,testid:tests[0]._id});
    } catch (error) {
      console.error('Error fetching tests:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };

  exports.fetchQuestions = async (req, res) => {
    try {
        const { testid } = req.query; 
        console.log("testis/............././././",testid)
       
        if (!testid) {
          return res.status(400).json({ message: 'Test ID is required' });
        }
    
   
        const questions = await Question.find({ testId: testid });
    
        if (!questions.length) {
          return res.status(404).json({ message: 'No questions found for this test ID' });
        }
    
        res.json(questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  };
  

