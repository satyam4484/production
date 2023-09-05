const express = require("express");
const router = express.Router();

const organization= require("../Controllers/organization.controller");
const verifyToken = require("../middleware/verifyToken");

router.route('/').post(verifyToken,organization.createOrganization);
router.route('/').patch(verifyToken,organization.updateOrganization);

router.route('/get-teachers-list').post(verifyToken,organization.getTeachers);
router.route('/departments-list').get(verifyToken,organization.getDepartments);
router.route('/verify-teacher').post(verifyToken,organization.verifyTeacher);

router.route('/add-to-department').post(verifyToken,organization.assignDepartment);


module.exports = router;
