const User =require('../Models/User')
exports.getAllUsers=async(req,res)=>{
try {
   const users=await User.findAll();
   if(users.length==0){
    res.status(200).json('vide')
   }else
   res.status(200).json(users) 
} catch (err) {
res.status(500).json({error:err.message})  ;  
}}
exports.addUser=async(req,res)=>{
    try {
        const user=await User.create({
            name:req.body.name,
            first_name:req.body.first_name,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            photo:req.body.photo,
            birthdate:req.body.birthdate,
            phone_number:req.body.phone_number,
            city:req.body.city,
            isSmoker:req.body.isSmoker,

        })
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error:err.message})  ;  
    }
}
