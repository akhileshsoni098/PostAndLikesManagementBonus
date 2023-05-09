const jwt = require("jsonwebtoken")


exports.auth = async (req,res, next)=>{
const token = req.headers["x-auth-token"]

if(!token){
    return res.status(400).send({staus:false , message:"header token is required"})
}

jwt.verify(token, process.env.JWT_SECRET_KEY , function(err, decoded){

if(err){
    return res.status(401).send({staus:false , message:err.message})
 
}
else{ 
    req.userId = decoded.userId

    next()
    
}


}) 


}