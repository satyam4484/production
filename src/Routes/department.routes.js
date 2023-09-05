const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const department = require("../Controllers/department.controller");


router.route('/').post(verifyToken, department.createDepartment);
router.route('/add-teachers').post(verifyToken, department.addTeachers);
router.route('/add-hod').post(verifyToken, department.createHod);

// subjects
router.route('/add-subjects').post(verifyToken, department.addSubjects);
router.route('/assign-subject').post(verifyToken, department.assignSubject)
router.post('/organization-departments', department.getOrganizationDepartmentsList)

module.exports = router;