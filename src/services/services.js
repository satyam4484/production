const jwt = require("jsonwebtoken");

require("dotenv").config()

module.exports.Response = (error, message = "", data = []) => {
  return { error, message, data };
};




module.exports.generateAuthToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY);
};




