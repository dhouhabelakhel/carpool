const User =require('../Models/User')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
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
   if(!users||users.length==0){
    res.status(200).json({message:'any users found!!'})
   }else
   res.status(200).send({
    items:limit,
    page:page,
    message:'users'
    ,data:users}) 
} catch (err) {
res.status(500).send({error:err.message})  ;  
}}
exports.getUserByID=async(req,res)=>{
    try {
        const id=req.params.id;
      const user=await User.findOne({where:{id}}) 
      if(user){
        return res.status(200).json({message:'user',data:user})
      } else{
        return res.json({message:'any user found'})
      }
    } catch (error) {
        res.status(500).send({error:err.message})  ;  
    }
}
exports.register=async(req,res)=>{
    try {
        body=req.body;
        const hashedPassword=await bcrypt.hash(body.password,10)
        const user=await User.create({
            name:body.name,
            first_name:body.first_name,
            username:body.username,
            email:body.email,
            password:hashedPassword,
            Gender:body.gender,
            birthdate:body.birthdate,
            phone_number:body.phone_number,
            city:body.city,
            isSmoker:body.isSmoker
        })
        res.status(201).json({message:'user created succesfully',data:user});
    } catch (err) {
        console.error(err)
        res.status(500).json({error:err.message})  ;  
    }
}
exports.update=async(req,res)=>{
    try {
        body=req.body;
        id=req.params.id;
        const user=await User.findOne({where:{id}});
        if(!user){
            res.json({message:'any user found!!'})
        }else{
            if(body.password){
                isCompatiblePasswords=await bcrypt.compare(body.old_password,user.password)
                if(isCompatiblePasswords){
                    body.password= await bcrypt.hash(body.password,10)
                }else{
                    return res.json({message:"wrong password!!"})
                }
                }
            if(req.file && req.file.path){body.photo=req.file.path.replace(/\\/g, '/')}
           await User.update(body,{where:{id}});
           const updatedUser = await User.findOne({ where: { id } });
            res.status(200).json({message:'user updated succefully',data:updatedUser})
        }
    } catch (err) {
        res.status(500).json({error:err.message})  ;  

    }
}
exports.auth=async(req,res)=>{
    try {
        body=req.body;
        email=body.email;
        const user=await User.findOne({where:{email}})
        if(!user){
            res.status(404).json({
                message:'wrong email'
            })
        }else{
            isValidPassword=await bcrypt.compare(body.password,user.password)
            if(!isValidPassword){
                res.json({
                    message:'wrong password'
                })   
            }else{
                const token = jwt.sign({ userId: user.id ,username:user.username},'your_secret_key', { expiresIn: '1h' });
                res.status(200).json({
                    message:'login sucessful',
                    token:token
                }) 
            }

        }
    } catch (err) {
        res.status(500).json({error:err.message})  ;  

    }
}