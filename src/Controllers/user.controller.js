const bcrypt = require("bcryptjs");
const { User, Contact } = require("../models/user.model");
const otpGenerator = require("otp-generator");

const { sendMail } = require("../services/mail");
const { Response, generateAuthToken } = require("../services/services");

require("dotenv").config();



/**
 * Get the user profile of the currently authenticated user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports.getUser = async (req, res) => {
  try {
    // Find the user by _id and populate the 'contact' field
    const user = await User.findOne(
      { _id: req.user._id },
      { password: 0, otp: 0 }
    );

    if (user) {
      // Send response with the user's profile
      res.send(Response(false, '', user));
    } else {
      // User not found or unauthorized
      throw 'Invalid User. Please log in again';
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

/**
 * Authenticate and log in a user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports.loginUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });

    if (user) {
      const value = await bcrypt.compare(data.password, user.password);
      if (value) {
        // Generate an authentication token and send it as response
        res.send(
          Response(false, '', {
            token: generateAuthToken(user._id),
          })
        );
      } else {
        throw 'Invalid Password. Please enter a valid password';
      }
    } else {
      throw 'Invalid Email. Please enter a valid email';
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};


/**
 * Create a new user account.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    if (data.password === data.confirmPassword) {
      // Create a new contact based on provided Contact data
      delete data['confirmPassword'];

      // Create a new user based on provided user data
      const user =  new User({ ...req.body });

      await user.save();

      if (user) {
        // Send an email to the user if the account is created
        // sendMail(response.name, response.otp);
        const populatedUser = await User.findOne({_id:user._id},{ password: 0, otp: 0 });

        res.status(201).send(Response(false, 'Account created successfully', populatedUser));
      } else {
        throw 'Something went wrong. Please try again';
      }
    } else {
      throw "Password didn't match";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

/**
 * Update the user profile of the authenticated user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports.updateUser = async (req, res) => {
  try {
    const data = req.body;

    // Find and update the user based on the provided _id
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true, select: '-password -contact' }
    );

    if (user) {
      // User profile updated successfully
      res.send(Response(false, 'User profile updated', user));
    } else {
      // User not found
      throw 'User not found';
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};


/**
 * Delete a user account.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports.deleteUser = async (req, res) => {
  try {
    // Delete the user based on the provided _id
    const user = await User.deleteOne({ _id: req.body._id });

    if (user.deletedCount === 1) {
      // User account deleted successfully
      res.send(Response(false, 'Account deleted successfully'));
    } else {
      // User not found
      throw 'User not found';
    }
  } catch (error) {
    console.log(error);
    res.send(Response(true, error));
  }
};


/**
 * Generate and send an OTP to the user's email.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports.generateOtp = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // Generate a new OTP
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      // Update the user's OTP and retrieve the updated user
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { otp: otp } },
        { new: true }
      );

      // Send the OTP to the user's email
      sendMail(updatedUser.name, updatedUser.otp);

      // Send response indicating successful OTP generation and email sending
      res.send(Response(false, 'OTP sent to email', { user_id: updatedUser._id }));
    } else {
      // User not found
      throw 'Enter a valid email';
    }
  } catch (error) {
    console.log(error);
    res.send(Response(true, error));
  }
};

/**
 * Verify the provided OTP for a user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports.verifyOtp = async (req, res) => {
  try {
    // Find the user by user_id
    const user = await User.findOne({ _id: req.body.user_id });

    if (user) {
      // Check if the provided OTP matches the user's OTP
      if (user.otp === req.body.otp) {
        // Update the user's is_verified status
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { is_verified: true } }
        );

        // Send response indicating successful OTP verification
        res.send(Response(false, "OTP verified successfully"));
      } else {
        // Invalid OTP provided
        throw "Invalid OTP! Please try again";
      }
    } else {
      // User not found
      throw "Invalid Email! Please try again";
    }
  } catch (error) {
    // Handle errors and send response with error message
    res.send(Response(true, error));
  }
};





// 1-> organization
// 2-> department
// 3-> students
