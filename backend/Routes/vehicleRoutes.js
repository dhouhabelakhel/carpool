const express=require('express')
const Router=express.Router();
const vehicleController=require('../Controllers/vehicleController');
Router.get('/',vehicleController.getAllVehicle);
module.exports=Router;