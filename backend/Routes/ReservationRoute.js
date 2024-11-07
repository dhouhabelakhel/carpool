const express=require('express')
const Router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware')
const ReservationController=require('../Controllers/TripReservationController');
Router.post('/',ReservationController.create)
Router.put('/:id',ReservationController.update)
Router.delete('/:id',ReservationController.destroy)
module.exports=Router