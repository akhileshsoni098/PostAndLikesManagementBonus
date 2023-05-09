const express = require("express");
const { auth } = require("../middi/auth");
const { createPost, getPost, updatePost, delPost } = require("../controller/PostController");

const router = express.Router();

router.route("/posts").post(auth ,createPost)

router.route("/getPost").get(getPost)

router.route("/updatePost/:id").put(auth ,updatePost)

router.route("/deletePost/:id").delete(auth , delPost)


module.exports = router