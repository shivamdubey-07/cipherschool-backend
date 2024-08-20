const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Submission = require('./models/submission');
const User = require('./models/user');
const Question = require('./models/question');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shivamdubeyfd@gmail.com',
    pass: 'zatc glyq lhrx xfiq', 
  },
});

async function calculateAndSendResults() {
  try {
 
    const submissions = await Submission.find({ isEvaluated: false });
    console.log(submissions)
    console.log("mai yaha hu")
    for (const submission of submissions) {
        console.log("mai yaha hu2")
      const user = await User.findById(submission.userId);
      const totalQuestions = submission.selections.length;
      let correctAnswers = 0;
        console.log("totalQuestions",totalQuestions)
      for (const selection of submission.selections) {
        console.log("selection...........................................................................................",selection)
        const question = await Question.findById(selection.questionId);
        console.log(question,".....")
        if (question.correctAnswer === selection.option) {
          correctAnswers++;
        }
      }

      submission.correctAnswers = correctAnswers;
      submission.wrongAnswers = totalQuestions - correctAnswers;
      submission.isEvaluated = false;
      await submission.save();
      const mailOptions = {
        from: '"Test Service" <shivamdubeyfd@gmail.com>',
        to: "sguruji1310@gmail.com",
        subject: 'Test Results',
        html: `
          <p>Hi ${user.name},</p>
          <p>Thank you for taking the test. Here are your results:</p>
          <p>You answered ${correctAnswers} out of ${totalQuestions} questions correctly.</p>
        `,
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    console.log('Results evaluation and emails sent successfully.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
}

module.exports = { calculateAndSendResults };
