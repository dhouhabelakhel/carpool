const express=require('express')
const Router=express.Router();
const vehicleController=require('../Controllers/vehicleController');
Router.get('/',vehicleController.getAllVehicle);
Router.post('/',vehicleController.addVehicle);
Router.get('/user/:id',vehicleController.getVehicleByUser)
module.exports=Router;