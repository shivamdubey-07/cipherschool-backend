const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
 
  testId: {
    type: ObjectId,
    ref: 'Test', 
  
  }
  ,
  marks:{
    type:Number,
    required:true,
    default:1

  },
  correctAnswer:{
    type:String,
  
  }
},{
    timestamps:true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
