const { Department, Teacher, Subject } = require("../models/department.model");
const { Response } = require("../services/services");


// Get departments of the organization by organization_id 
module.exports.getOrganizationDepartmentsList = async (req, res) => {
    try {
        // Retrieve departments of the organization
        const departments = await Department.find({ organization: req.body.organization_id }, { name: true });
        res.send(Response(false, "", departments));
    } catch (error) {
        res.send(Response(true, error));
    }
};


module.exports.assignSubject = async (req, res) => {
    try {
        if (req.user.userType === 2 && req.teacher.is_hod === true) {
            const subject = req.body.subject_id;
            const teacher = await Teacher.findOneAndUpdate(
                { _id: req.body.teacher_id },
                { $push: { subjects: subject } },
                { new: true }
            );
            if (teacher) {
                res.send(Response(false, "Subject Assigned"));
            } else {
                throw "Enter a valid data ";
            }
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
}


module.exports.addSubjects = async (req, res) => {
    try {
        if (req.user.userType === 2 && req.teacher.is_hod === true) {
            const data = req.body;
            const newSubject = await Subject.create({
                department: req.teacher.department,
                ...data
            })
            await newSubject.save();
            res.send(Response(false, "", newSubject));
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
}
module.exports.createDepartment = async (req, res) => {
    try {
        if (req.user.userType == 1) {
            const data = req.body;
            const newDepartment = await Department.create({
                ...data
            });
            await newDepartment.save();
            res.send(Response(false, "", newDepartment));
        } else {
            throw "Access denied"
        }

    } catch (error) {
        res.send(Response(true, error));
    }
}


module.exports.addTeachers = async (req, res) => {
    try {
        if (req.user.userType != 3) {
            const department = await Department.findOne({ _id: req.body.departmentId });
            if (department) {
                const member = req.body.memberIds.map(member => (member.id));
                department.members.push(...member);
                await department.save();
                res.send(Response(false, "Faculty added successfully"));
            } else {
                throw "Invalid Department";
            }
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
}
// function to add a teacher as a hod for a department
module.exports.createHod = async (req, res) => {
    try {
        if (req.user.userType == 1) {
            console.log()
            const teacher = await Teacher.findOneAndUpdate({ _id: req.body._id }, { $set: { is_hod: true } }, { new: true });
            if (teacher) {
                res.send(Response(false, "Hod updated successfully"));
            } else {
                throw "Select a valid teacher";
            }
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};
