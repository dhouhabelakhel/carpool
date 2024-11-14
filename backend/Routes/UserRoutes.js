const express=require('express')
const Router=express.Router();
const userController=require('../Controllers/UserController');
const multer=require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: 'uploads/users',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage,limits: { fileSize: 10 * 1024 * 1024 } });
Router.get('/',userController.getAllUsers);
Router.get('/:id',userController.getUserByID);
Router.post('/',userController.register);
Router.post('/auth',userController.auth);
Router.put('/:id',upload.single('photo'),userController.update)
Router.put('/update/:id',userController.updatePass)

module.exports=Router;