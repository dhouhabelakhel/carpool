const express=require('express')
const Router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware')
const multer=require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: 'uploads/vehicles',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage,limits: { fileSize: 10 * 1024 * 1024 } });
const vehicleController=require('../Controllers/vehicleController');
Router.get('/',authMiddleware.authenticate,vehicleController.getAll);
Router.post('/',authMiddleware.authenticate, upload.single('photo'),vehicleController.create);
Router.put('/:id',upload.single('photo'),vehicleController.update)
Router.delete('/:id',vehicleController.destory)
Router.get('/:registrationNb',vehicleController.getVehicleByRegistrationNumber)
module.exports=Router;