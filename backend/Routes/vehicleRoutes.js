const express=require('express')
const Router=express.Router();
const upload = require('../config/multerConfig');

const vehicleController=require('../Controllers/vehicleController');
Router.get('/',vehicleController.getAllVehicle);
Router.post('/', upload.single('photo'),vehicleController.addVehicle);
Router.get('/user/:id',vehicleController.getVehicleByUser)
Router.get('/:registrationNb',vehicleController.getVehicleByRegistrationNumber)
module.exports=Router;