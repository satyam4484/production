const { model, Schema } = require("mongoose");

const organizationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  is_verified:{
    type:Boolean,
    default:false
  }
});





module.exports = {
  Organization: model("organization", organizationSchema),
};
