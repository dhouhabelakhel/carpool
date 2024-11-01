const vehicle = require('../Models/vehicle')
exports.getAllVehicle = async (req, res) => {
    try {
        const {model,seats,user_id}=req.query;
        const conditions={}
        if(model){conditions.model=model}
        if(seats){conditions.seats=seats}
        if(user_id){conditions.user_id=user_id}
        const vehicles = await vehicle.findAll({
            where:conditions
        });
        if (!vehicles||vehicles.length == 0) {
            res.status(201).send({message:'any vehicle found!!'})
        } else
            res.status(201).send(vehicles)
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

exports.getVehicleByRegistrationNumber=async(req,res)=>{
    try {
       const regNumber=req.params.registrationNb; 
       const resVehicle=await vehicle.findAll({where :{ registration_number : regNumber} });
       if(!resVehicle)
       {
        res.status(400).send({message:'not found!!!'});
       }else {
        res.status(200).send({message:'vehicle found succesffully :',data:resVehicle})
       }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}
exports.addVehicle = async (req, res) => {
    try {
        body = req.body;
        const normalizedPath = req.file.path.replace(/\\/g, '/');
        
                const Newvehicle = await vehicle.create({
            photo:normalizedPath,
            description: body.description,
            model: body.model,
            registration_number: body.registration_number,
            seats: body.seats,
            rent: body.rent,
            user_id: body.user_id
        })
     
        res.status(201).send({message:"added succsseffully",data:Newvehicle})
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

