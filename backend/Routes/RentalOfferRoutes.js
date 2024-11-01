const express=require('express');
const Router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware')
const RentalOfferController=require('../Controllers/RentalOfferController')
Router.post('/',authMiddleware.authenticate,RentalOfferController.addRentalOffer);
Router.get('/',authMiddleware.authenticate,RentalOfferController.getAvailableRentalOffer);
Router.get('/:vehicle_id',authMiddleware.authenticate,RentalOfferController.getRentalOfferByVehicle);

module.exports=Router