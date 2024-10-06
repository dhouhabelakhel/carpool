const vehicle= require('../Models/vehicle')
exports.getAllVehicle=async(req,res)=>{
    try {
       const vehicles=await vehicle.findAll();
       if(vehicles.length==0){
        res.status(201).json('vide')
       }else
       res.status(201).json(vehicles) 
    } catch (err) {
    res.status(500).json({error:err.message})  ;  
    }}
    exports.addVehicle=async(req,res)=>{
        try {
            body=req.body;
            const Newvehicle=await vehicle.create({
            photo:body.photo,
            description:body.description,
            model:body.model,
            seats:body.seats,
            rent:body.rent,
            user_id:body.user_id
            })
            res.status(201).json(Newvehicle)
        } catch (error) {
           res.status(500).json({error : error.message}) ;
        }
    }
