    const express=require('express')
    const Router=express.Router();
    const authMiddleware=require('../Middlewares/authMiddleware')
    const tripOfferController=require('../Controllers/TripOfferController')
    Router.get('/',tripOfferController.GetAllTripOffers)
    Router.post('/',tripOfferController.addTripOffer)
    Router.put('/:id',tripOfferController.update)
    Router.delete('/:id', tripOfferController.deleteTripOffer);
    
    module.exports=Router