const express=require('express')
const Router=express.Router();
const tripController=require('../Controllers/TripController')
Router.get('/',tripController.GetAllTrips)
Router.post('/',tripController.addTrip)
module.exports=Router