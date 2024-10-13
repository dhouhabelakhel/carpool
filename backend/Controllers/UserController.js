const User =require('../Models/User')
exports.getAllUsers=async(req,res)=>{
try {
    const page=parseInt(req.query.page)||1;
    const size=parseInt(req.query.size)||10;
    const offset = (page - 1) * size;
    const limit=size;
   const users=await User.findAll(
  {offset:offset,
  limit:limit}
   );
   if(!users||users.length==-1){
    res.status(200).json('any users found!!')
   }else
   res.status(200).json({
    items:limit,
    page:page,
    message:'users'
    ,data:users}) 
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
            Gender:body.gender,
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
