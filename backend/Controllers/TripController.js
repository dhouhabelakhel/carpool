const trip=require('../Models/Trip')
exports.GetAllTrips=async(req,res)=>{
    try {
        
            const page=parseInt(req.query.page)||1;
            const size=parseInt(req.query.size)||10;
            const offset = (page - 1) * size;
            const limit=size;
          const trips=await trip.findAll({
            offset:offset,
            limit:limit
          });
          if(!trips||trips.length==0){
            res.status(400).send('any trips found!!')
          }  else{
            res.status(200).send({
                page:page,
                items:size,
                message:"trips :",
                data:trips
            })
          }
    } catch (error) {
        res.status(500).send({ error: error.message })   
  
    }
}
exports.addTrip=async(req,res)=>{
    const body=req.body;
    const NewTrip=await trip.create({
        start_point:body.start_point,
        destination:body.destination
    })
  
    try {
        if(!NewTrip){
          res.status(400).send({message:'failed to add the new trip!!'})
        }  else{
            res.status(201).send({
                message:"trip added successfully!!!",
                data:NewTrip
            })
        }  
    } catch (error) {
        res.status(500).send({ error: error.message })   
 
    }
}