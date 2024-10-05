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
    }
}