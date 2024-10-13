const tripOffer=require('../Models/TripOffer')
exports.GetAllTripOffers=async(req,res)=>{
    try {
        
            const page=parseInt(req.query.page)||1;
            const size=parseInt(req.query.size)||10;
            const offset = (page - 1) * size;
            const limit=size;
          const offers=await tripOffer.findAll({
            offset:offset,
            limit:limit
          });
          if(!offers||offers.length==0){
            res.status(400).send('any offers found!!')
          }  else{
            res.status(200).send({
                page:page,
                items:size,
                message:"offers :",
                data:offers
            })
          }
    } catch (error) {
        res.status(500).send({ error: error.message })   
  
    }
}
exports.addTripOffer=async(req,res)=>{
    const body=req.body;
    const NewOffer=await tripOffer.create({
        trip_date:body.trip_date,
        starTime:body.start_time,
        price:body.price,
        places:body.places,
        isSmokingAllowed:body.isSmokingAllowed,
        user_id:body.user_id,
        trip_id:body.trip_id
    })
  
    try {
        if(!NewOffer){
          res.status(400).send({message:'failed to add the new offer!!'})
        }  else{
            res.status(201).send({
                message:"offer added successfully!!!",
                data:NewOffer
            })
        }  
    } catch (error) {
        res.status(500).send({ error: error.message })   
 
    }
}