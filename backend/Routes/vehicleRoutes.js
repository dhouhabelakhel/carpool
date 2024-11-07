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
Router.get('/',authMiddleware.authenticate,vehicleController.getAllVehicle);
Router.post('/',authMiddleware.authenticate, upload.single('photo'),vehicleController.addVehicle);
Router.get('/:registrationNb',authMiddleware.authenticate,vehicleController.getVehicleByRegistrationNumber)
module.exports=Router;