const express = require("express")
const fileUpload = require("express-fileupload")
const cloudinary = require('cloudinary').v2;

const app = express()

app.use(express.json())

app.use(fileUpload({
useTempFiles:true,
limits:{fileSize: 50*2024*1024}
}))


// Configuration 
cloudinary.config({
    cloud_name: "decjoyrmj",
    api_key: "627647724186355",
    api_secret: "mw_DjfFMzfZ2pKOWv1hNyuP8T0A"
  });
  

const user = require("./routes/userRoute")
 const Post = require("./routes/postRoute")
app.use("/", user)
app.use("/post/", Post)
module.exports = app