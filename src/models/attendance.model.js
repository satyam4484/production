const { model, Schema } = require("mongoose");

const attendanceSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default:Date.now
    },
    is_present: {
        type: Boolean,
        default: false,
    },
});


const Attendance = model('Attendance',attendanceSchema);


module.exports = {Attendance};


