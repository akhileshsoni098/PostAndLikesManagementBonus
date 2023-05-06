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
  
//   app.post("/upload/cloud", async (req,res)=>{
//     const file = req.files.image
//     const result = await cloudinary.uploader.upload(file.tempFilePath,{
//         public_id:`${Date.now()}`,
//         resource_type: "auto",
//         folder: "images"
//     })
//     res.send({url:result.url})
//   })

const user = require("./routes/userRoute")
 
app.use("/", user)

module.exports = app