const TripOffer = require('../Models/TripOffer');
const tripOffer=require('../Models/TripOffer')
const User = require('../Models/User');  // Import the User model

exports.GetAllTripOffers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const offset = (page - 1) * size;
        const limit = size;
        const { start_point, destination, trip_date,price } = req.query;
        const conditions = {};
  
        if (start_point) {
           conditions.start_point=start_point;
        }
  
        if (destination) {
           conditions.destination = destination;
        }
        if (price) {
            conditions.price = price;
         }
         if (trip_date) {
            conditions.trip_date = new Date(trip_date);
         }
        const offers = await tripOffer.findAll({
            where:conditions,
            offset: offset,
            limit: limit,
            include: [{
                model: User,
                as: 'user',  
                
            }]
        });

        if (!offers || offers.length == 0) {
            res.status(200).json('No offers found!!');
        } else {
            res.status(200).send({
                page: page,
                items: size,
                message: "offers:",
                data: offers
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.addTripOffer=async(req,res)=>{
  
    try {
        const body=req.body;
        const NewOffer=await tripOffer.create({
            trip_date:body.trip_date,
            starTime:body.start_time,
            price:body.price,
            places:body.places,
            isSmokingAllowed:body.isSmokingAllowed,
            user_id:body.user_id,
            destination:body.destination,
            start_point:body.start_point
        })
        if(!NewOffer){
          res.send({message:'failed to add the new offer!!'})
        }  else{
            res.status(201).send({
                message:"offer added successfully!!!",
                data:NewOffer
            })
            if (req.io) {
                req.io.emit('newTripOffer', NewOffer);
            }           
        }  
    } catch (error) {
        res.status(500).send({ error: error.message })   
 
    }
}
exports.update=async(req,res)=>{
    try {
        body=req.body;
        id=req.params.id;
        const tripOffer=await TripOffer.findOne({where:{id}});
        if(!tripOffer){
            res.status(404).json({message:'any trip Offer found!!'})
        }else{
           await TripOffer.update(body,{where:{id}});
           const updatedOffer = await TripOffer.findOne({ where: { id } });
            res.status(200).json({message:'trip offer updated succefully',data:updatedOffer})
        }
    } catch (err) {
        res.status(500).json({error:err.message})  ;  

    }
}
exports.getById=async(req,res)=>{
    try {
        id=req.params.id;
        const tripOffer=await TripOffer.findOne({where:{id}});
        if(!tripOffer){
            res.status(404).json({message:'any trip Offer found!!'})
        }else{
            res.status(200).json({message:'trip offer founded succefully',data:tripOffer})
        }
    } catch (err) {
        res.status(500).json({error:err.message})  ;  

    }
}
exports.getByUserId=async(req,res)=>{
    try {
        user_id=req.params.id;
        const tripOffer=await TripOffer.findAll({where:{user_id}});
        if(!tripOffer){
            res.status(404).json({message:'any trip Offer found!!'})
        }else{
            res.status(200).json({message:'trip offer founded succefullyyyy',data:tripOffer})
        }
    } catch (err) {
        res.status(500).json({error:err.message})  ;  

    }
}