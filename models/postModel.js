const mongoose = require("mongoose")



const PostSchema =new mongoose.model({

    
        user: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
            },
        text:{ 
            type:String
        },
        PostImage: {
            type:String
        },
        video: {
            String
        },
        is_private: {
            type: Boolean,
             default: false
            },
        hashtags: [
            String
        ],
        friend_tags: [{
             type: mongoose.Schema.Types.ObjectId,
              ref: 'User' 
            }],
        likes: [{ 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
            }],
        comments: [{
             type: mongoose.Schema.Types.ObjectId,
              ref: 'Comment' 
            
            }]

},{timestamps:true})


module.exports = mongoose.model("Post",PostSchema )

