const express=require('express')
const Router=express.Router();
const userController=require('../Controllers/UserController');
Router.get('/',userController.getAllUsers);
Router.post('/',userController.addUser)
module.exports=Router;