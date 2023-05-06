const UserModel = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

exports.register = async (req, res) => {
  const data = req.body;

  let { name, email, password, gender, mobile, userName, profile_image } = data;

  if (!name) {
    return res
      .status(400)
      .send({ status: false, message: "please provide Your name" });
  }

  if (!email) {
    return res
      .status(400)
      .send({ status: false, message: "please provide your eamil" });
  }

  const checkEmail = await UserModel.findOne({ email: email });

  if (checkEmail) {
    return res
      .status(400)
      .send({
        status: false,
        message: "This email is already exist try with another email",
      });
  }
  //email validation remain

  if (!password) {
    return res
      .status(400)
      .send({ status: false, message: "please enter your password " });
  }
  //password validation remain

  if (!gender) {
    return res
      .status(400)
      .send({ status: false, message: "please Provide your gender " });
  }
  if (!["Male", "Female", "Others"].includes(gender)) {
    return res
      .status(400)
      .send({
        status: false,
        message: "please enter any of these Male, Female, Others",
      });
  }

  if (!mobile) {
    return res
      .status(400)
      .send({ status: false, message: "please Provide your phone No. " });
  }
  // regex for indian number

  if (!userName) {
    return res
      .status(400)
      .send({ status: false, message: "please Provide your username. " });
  }
  const checkUserName = await UserModel.findOne({ email: email });

  if (checkUserName) {
    return res
      .status(400)
      .send({
        status: false,
        message: "This userName is already exist try with another userName",
      });
  }

  //=============== validating profile image =========================

  if (!req.files || !req.files.profile_image) {
    return res.status(400).send({
      status: false,
      message: "Please provide your profile image",
    });
  }
  
  const file = req.files.profile_image;
   
  // check if file is an image
  if (!file.mimetype.startsWith("image/")) {
    return res.status(400).send({
      status: false,
      message: "Please provide a valid image file",
    });
  }
  
  // check if file size is less than 10MB
  if (file.size > 10 * 1024 * 1024) {
    return res.status(400).send({
      status: false,
      message: "Image size should be less than 10MB",
    });
  }

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
    folder: "images",
  });
//==================================================
  profile_image = data.profile_image = result.url;

  const saveData = await UserModel.create(data);

  res.status(201).send({ status: true, data: saveData });
};
