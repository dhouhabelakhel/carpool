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
         console.log('Conditions:', conditions); // Debugging line
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
    const body=req.body;
    const NewOffer=await tripOffer.create({
        start_point:body.start,
        destination:body.destination,
        trip_date:body.trip_date,
        starTime:body.time,
        price:body.price,
        places:body.places,
        isSmokingAllowed:false,
        user_id:body.user_id,

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