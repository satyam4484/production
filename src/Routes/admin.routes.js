const express = require("express");
const router = express.Router();

const admin= require("../Controllers/admin.controller");
const verifyToken = require("../middleware/verifyToken");

router.route('/get-organizations').get(admin.getOrganizationList);
router.route('/verify-organizations').post(verifyToken,admin.verifyOrganization);

router.route('/get-organization/:id').get(admin.getOrganization);

module.exports = router;
