const {User,Contact} = require('../models/user.model');
const {Response} = require('./services');


module.exports.checkValid = async (req, res) => {
    try {

      const email = await User.findOne({ ...req.body});
      if (email) {
        throw "Please try different one";
      } else {
        res.send(Response(false));
      }
    } catch (error) {
      res.send(Response(true, error));
    }
  };
  
