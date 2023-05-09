const UserModel = require("../models/userModel");
const PostModel = require("../models/postModel");
const cloudinary = require("cloudinary").v2;

exports.createPost = async (req, res) => {
  let userId = req.userId;

  let data = req.body;

  let { text, PostImage, video, is_private, hashtags, friend_tags } = data;

  //============== need to think on it ===============

  if (friend_tags) {
    friend_tags = friend_tags.split(" ");
    console.log(friend_tags);

    for (let i = 0; i < friend_tags.length; i++) {
      let checkFollower = await UserModel.findOne({ userName: friend_tags[i] });

      if (!checkFollower) {
        return res
          .status(400)
          .send({
            status: false,
            message: `This ${friend_tags[i]} user is not your friend `,
          });
      }
    }
  }
  //=========================

  //================= image validation =====================

  if (req.files || req.files.PostImage) {
    const file = req.files.PostImage;

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

    PostImage = data.PostImage = result.url;
  }

  //============================================================

  //================ video validation ===========================

  if (req.files && req.files.video) {
    const file = req.files.video;

    // check if file is a video
    if (!file.mimetype.startsWith("video/")) {
      return res.status(400).send({
        status: false,
        message: "Please provide a valid video file",
      });
    }

    // check if file size is less than 100MB
    if (file.size > 100 * 1024 * 1024) {
      return res.status(400).send({
        status: false,
        message: "Video size should be less than 100MB",
      });
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "video",
      folder: "videos",
      chunk_size: 6000000,
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
      eager_notification_url: null,
    });

    video = data.video = result.url;
  }
  //==================================================

  user = data.user = userId;
  const savePost = await PostModel.create(data);

  let post = (data.post = savePost._id);

  await UserModel.findOneAndUpdate(
    { _id: userId },
    { posts: post },
    { new: true }
  );

  res
    .status(201)
    .send({ status: true, message: "post created sussfully", data: savePost });
};

//=========================== get post ==============================

exports.getPost = async (req, res) => {
  const postdata = await PostModel.find();
  if (postdata.length == 0) {
    return res.status(404).send({ status: false, message: "data not found" });
  }

  res.status(400).send({ status: false, data: postdata });
};

//=========================== update post ==============================

exports.updatePost = async (req, res) => {
  let postId = req.params.id;

  let checkUser = await PostModel.findOne({ user: req.userId, _id: postId });

  if (!checkUser) {
    return res.status(400).send({ status: false, message: "no data found" });
  }

  let data = req.body;

  let { text, PostImage, video, is_private, hashtags, friend_tags } = data;

  //============== need to think on it ===============

  if (friend_tags) {
    friend_tags = friend_tags.split(" ");
    console.log(friend_tags);

    for (let i = 0; i < friend_tags.length; i++) {
      let checkFollower = await UserModel.findOne({ userName: friend_tags[i] });
 
      if (!checkFollower) {
        return res
          .status(400)
          .send({
            status: false,
            message: `This ${friend_tags[i]} user is not in your friend List`,
          });
      }
    }
  }
  //================= image validation =====================

  if (req.files || req.files.PostImage) {
    const file = req.files.PostImage;

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

    PostImage = data.PostImage = result.url;
  }

  //============================================================

  //================ video validation ===========================

  if (req.files && req.files.video) {
    const file = req.files.video;

    // check if file is a video
    if (!file.mimetype.startsWith("video/")) {
      return res.status(400).send({
        status: false,
        message: "Please provide a valid video file",
      });
    }

    // check if file size is less than 100MB
    if (file.size > 100 * 1024 * 1024) {
      return res.status(400).send({
        status: false,
        message: "Video size should be less than 100MB",
      });
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "video",
      folder: "videos",
      chunk_size: 6000000,
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
      eager_notification_url: null,
    });

    video = data.video = result.url;
  }
  //==================================================

  let updatePosts = await PostModel.findOneAndUpdate(
    { _id: postId },
    { ...data },{new:true}
  );

  res
    .status(201)
    .send({
      status: true,
      message: "post created sussfully",
      data: updatePosts,
    });
};

//============================= delete Post =========================================


exports.delPost = async (req,res)=>{

let postId = req.params.id

let checkUser = await PostModel.findOne({ user: req.userId, _id: postId });

if (!checkUser) {
  return res.status(400).send({ status: false, message: "no data found" });
}

await PostModel.findByIdAndDelete(postId)

res.status(200).send({status:true, message:"Post deleted successfully"})

}


