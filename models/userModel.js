const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: true,
  },
},{timestmps:true}); 

module.exports = mongoose.model("User", userSchema);
