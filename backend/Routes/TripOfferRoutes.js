const express=require('express')
const Router=express.Router();
const tripOfferController=require('../Controllers/TripOfferController')
Router.get('/',tripOfferController.GetAllTripOffers)
Router.post('/',tripOfferController.addTripOffer)
module.exports=Router