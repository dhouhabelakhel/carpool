const express=require('express')
const Router=express.Router();
const multer=require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage,limits: { fileSize: 10 * 1024 * 1024 } });
const vehicleController=require('../Controllers/vehicleController');
Router.get('/',vehicleController.getAllVehicle);
Router.post('/', upload.single('photo'),vehicleController.addVehicle);
Router.get('/:registrationNb',vehicleController.getVehicleByRegistrationNumber)
module.exports=Router;