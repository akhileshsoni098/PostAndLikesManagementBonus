const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken")

//======================================== register user ===========================================

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
  const checkUserName = await UserModel.findOne({ userName: userName });

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

//======================================= logIn user ===============================================

exports.logIn = async (req,res)=> { 

let data = req.body
let {email , password} = data

const checkEP = await userModel.findOne({email:email, password:password})

if(!checkEP){
  return res.status(400).send({status:false , message:"email or password is incorrect"})
}

let token = jwt.sign({userId:checkEP._id},process.env.JWT_SECRET_KEY)

res.status(200).send({staus:true , message:"successfull logIn", token:token})

}

//===============================  update user ========================


exports.updateUser = async (req, res)=>{
  let userId = req.userId
 const data = req.body;

  let { name, email, password, gender, mobile, userName, profile_image } = data;

  if (email) {
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
  }
  //=====regex====
  // if (password) {
  //    //password validation remain
  // }
  if (gender) {

  if (!["Male", "Female", "Others"].includes(gender)) {
    return res
      .status(400)
      .send({
        status: false,
        message: "please enter any of these Male, Female, Others",
      });
  }
  }

  //======== regex============
  // if (mobile) {
  //  // regex for indian number
  // }
  

  if (userName) {
    const checkUserName = await UserModel.findOne({ userName: userName });

    if (checkUserName) {
      return res
        .status(400)
        .send({
          status: false,
          message: "This userName is already exist try with another userName",
        });
  }
  }
  //=============== validating profile image =========================

  if (req.files || req.files.profile_image) {
    
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

    profile_image = data.profile_image = result.url;
  }
//==================================================
 

  const  updateData = await UserModel.findOneAndUpdate({_id:userId},{...data},{new:true});

res.status(200).send({status:false , message:"updated successfully", data:updateData})

}

//=============================== get user profile =================================


exports.profile = async (req,res)=>{

let userId = req.userId

const profileData  = await UserModel.findById(userId)

res.status(200).send({status:false, message:"profile details" ,data:profileData})

}


//=============================== delete user profile =================================

exports.delProfile = async (req,res)=>{

  let userId = req.userId
  
  const profileData  = await UserModel.findByIdAndDelete(userId)
  
  res.status(200).send({status:false, message:"profile deleted Successfully"})
  
  }













