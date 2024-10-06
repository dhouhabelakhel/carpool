const express=require('express');
const Router=express.Router();
const RentalOfferController=require('../Controllers/RentalOfferController')
Router.post('/',RentalOfferController.addRentalOffer);
module.exports=Router