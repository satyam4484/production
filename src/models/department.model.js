const { model, Schema } = require("mongoose");

const departmentSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique:true
  },
});


const TeacherSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    is_hod:{
      type:Boolean,
      default:false
    },
    verified:{
      type:Boolean,
      default:false
    },
    department:{
      type:Schema.Types.ObjectId,
      ref:'Department',
      default:undefined
    },
});

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  teacher:{
    type:Schema.Types.ObjectId,
    ref:'Teacher',
    required:true
  }
});



const Department = model("Department", departmentSchema);
const Subject = model("Subject", subjectSchema);
const Teacher = model("Teacher",TeacherSchema);

module.exports = { Department, Subject,Teacher };
