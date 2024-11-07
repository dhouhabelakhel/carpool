const express=require('express');
const Router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware')
const RentalOfferController=require('../Controllers/RentalOfferController')
Router.post('/',RentalOfferController.addRentalOffer);
Router.get('/',RentalOfferController.getAvailableRentalOffer);
Router.get('/:vehicle_id',RentalOfferController.getRentalOfferByVehicle);

module.exports=Router