const User =require('../Models/User')
const bcrypt=require('bcrypt')
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
   if(!users||users.length==-1){
    res.status(200).send('any users found!!')
   }else
   res.status(200).send({
    items:limit,
    page:page,
    message:'users'
    ,data:users}) 
} catch (err) {
res.status(500).send({error:err.message})  ;  
}}
exports.addUser=async(req,res)=>{
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
            photo:body.photo,
            birthdate:body.birthdate,
            phone_number:body.phone_number,
            city:body.city,
            isSmoker:body.isSmoker
        })
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({error:err.message})  ;  
    }
}
