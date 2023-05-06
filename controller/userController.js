

const UserModel = require("../models/userModel")
const cloudinary = require('cloudinary').v2;

exports.register = async (req, res)=>{
    const data = req.body

    const file = req.files.profile_image
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
        public_id:`${Date.now()}`,
        resource_type: "auto",
        folder: "images"
    })

profile_image = data.profile_image = result.url

const saveData = await UserModel.create(data)

res.status(201).send({status: true , data:saveData})

}
























