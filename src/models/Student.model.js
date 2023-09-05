const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rollNumber: {
    type: Number,
    default: 1
  },
  batch:{
    type:String,
    required:true
  },
  verified: {
    type: Boolean,
    default: false
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    default: undefined
  },
  semesters: [{
    semNumber: { type: Number, required: true },
    subjects: [{
      subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
      },
      attendance: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Attendance',
          required: true
        }
      ]
    }]
  }]
});


studentSchema.index({batch:1,rollNumber:1},{unique:true});

const Student = model('Student', studentSchema);


module.exports = { Student }