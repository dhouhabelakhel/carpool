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
        body=req.body;
     
        const user=await User.create({
            name:body.name,
            first_name:body.first_name,
            username:body.username,
            email:body.email,
            password:body.password,
            gender:body.gender,
            photo:body.photo,
            birthdate:body.birthdate,
            phone_number:body.phone_number,
            city:body.city,
            isSmoker:body.isSmoker,

        })
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({error:err.message})  ;  
    }
}
