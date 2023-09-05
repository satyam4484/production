const express = require("express");
const router = express.Router();

const user = require("../Controllers/user.controller");

const validate = require("../services/validation");

const verifyToken = require("../middleware/verifyToken");

// Validate Email and Contact
router.post('/validate_data', validate.checkValid);

// User Verification and OTP
router.post('/verify-otp', user.verifyOtp);
router.post('/generate-otp', user.generateOtp);

// User Account Operations
router.post('/create', user.createUser);
router.patch('/update', verifyToken, user.updateUser);
router.post('/login', user.loginUser);
router.post('/', user.deleteUser);
router.get('/', verifyToken, user.getUser); // Get user profile



module.exports = router;

