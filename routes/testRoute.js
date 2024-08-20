const express = require('express');
const { createTest, getTestResults,getTests,deleteTest,searchTestsByName ,fetchQuestions} = require('../controllers/testController');
const verifyToken  =require('../middlewares/authorize')

const router = express.Router();

router.post('/tests', createTest);
router.get('/results', getTestResults);
router.get('/tests', getTests);
router.delete('/tests/:testId', deleteTest); 
router.get('/exam',verifyToken,searchTestsByName);
router.get('/fetchQuestions',verifyToken,fetchQuestions)

module.exports = router;
