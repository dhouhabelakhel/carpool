const express=require('express')
const Router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware')
const tripOfferController=require('../Controllers/TripOfferController')
Router.get('/',authMiddleware.authenticate,tripOfferController.GetAllTripOffers)
Router.post('/',authMiddleware.authenticate,tripOfferController.addTripOffer)
module.exports=Router