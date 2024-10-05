const User =require('../Models/User')
exports.getAllUsers=async(req,res)=>{
try {
   const users=await User.findAll();
   res.status(201).json(users) 
} catch (err) {
res.status(500).json({error:err.message})  ;  
}
}