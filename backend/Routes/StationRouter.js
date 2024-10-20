const express=require('express');
const Router=express.Router();
const stationController=require('../Controllers/StationController');
Router.post('/',stationController.addStation)
Router.get('/',stationController.getAllStations)

module.exports=Router;