const { Schema, model } = require("mongoose");
const userMiddleware = require("../middleware/user.middleware");

require("dotenv").config()




const userSchema = new Schema({
    userType: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type:String
    },
    is_verified:{
        type:Boolean,
        default:false
    }
});

// save password in hash way middleware
userSchema.pre("save",userMiddleware.hashPasswordAndGenerateUniqueOtp);

// create user related profiles
userSchema.post("save",userMiddleware.userRoles);

// delete user related tables
userSchema.pre("deleteOne",{ query:true,document: false },async function(next) {
    const user =await  User.findOne({_id:this.getQuery()._id});
    await userMiddleware.deleteUserCascade(user,next);
    
    next();
});

const User=  model("User", userSchema);

module.exports = {
    User
};


// populate