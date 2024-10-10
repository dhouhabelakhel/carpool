const rentalOffer=require('../Models/RentalOffer');
exports.addRentalOffer=async(req,res)=>{
   try {
      body=req.body;

 const  newRenatlOffer=await rentalOffer.create({
    rental_date:body.rental_date,
    description:body.description,
    price:body.price,
    start_date:body.start_date,
    duration:body.duration,
    isAvailable:body.isAvailable,
    vehicle_id:body.vehicle_id
 })
 res.status(200).json(newRenatlOffer);
   } catch (error) {
    res.status(500).json({error:error.message})
   }
}