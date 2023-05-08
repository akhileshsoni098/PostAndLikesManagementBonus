const express = require("express");
const { register, logIn, updateUser, profile, delProfile } = require("../controller/userController");
const { auth } = require("../middi/auth");


const router = express.Router();

router.route("/register").post(register)

router.route("/logIn").post(logIn)

router.route("/update").put(auth,updateUser) 

router.route("/profile").get(auth,profile) 

router.route("/delProfile").delete(auth,delProfile) 

module.exports = router

