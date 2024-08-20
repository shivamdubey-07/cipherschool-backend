const express = require('express');
const router = express.Router();
const { createSubmission } = require('../controllers/submissionController'); 
const verifyToken  =require('../middlewares/authorize')

router.post('/submit',verifyToken, createSubmission);

module.exports = router;
