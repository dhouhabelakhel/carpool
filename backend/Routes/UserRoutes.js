const express=require('express')
const Router=express.Router();
const userController=require('../Controllers/UserController');
Router.get('/',userController.getAllUsers);
Router.post('/',userController.register);
Router.post('/auth',userController.auth);
module.exports=Router;