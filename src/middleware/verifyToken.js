const jwt = require("jsonwebtoken");
const {Response} = require("../services/services");

const {User} = require("../models/user.model");
const {Organization} = require("../models/organization.model");
const { Teacher } = require("../models/department.model");
const { Student } = require("../models/Student.model");

async function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(" ")[1];
            const tokenVerify = await jwt.verify(token, process.env.SECRET_KEY);
            if (tokenVerify) {
                const user = await User.findOne(
                    { _id: tokenVerify._id },
                    { userType:1 }
                  );
                req.user = user;
                if(user.userType === 1) {
                    const organization = await Organization.findOne({user:user._id});
                    req.organization = organization;
                }else if(user.userType === 2) {
                    const teacher = await Teacher.findOne({user:user._id});
                    req.teacher = teacher;
                }else if(user.userType === 3) {
                    const student = await Student.findOne({user:user._id});
                    req.student = student;
                }
            }
            next();
        } else {
            res.send({ result: "Token is invalid" })
        }
    } catch (error) {
        res.send(Response(true,"Invalid User"))
    }
}

module.exports = verifyToken;