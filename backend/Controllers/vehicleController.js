const vehicle = require('../Models/vehicle')
exports.getAllVehicle = async (req, res) => {
    try {
        const vehicles = await vehicle.findAll();
        if (!vehicles||vehicles.length == -1) {
            res.status(201).json({message:'any vehicle found!!'})
        } else
            res.status(201).json(vehicles)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getVehicleByUser = async (req, res) => {
    try {
        const id = req.params.id;
        const resVehicle = await vehicle.findAll({ where: { user_id: id } });
        if (!resVehicle) {
            res.status(400).json({ message: 'not found!!' })
        } else {
            res.status(200).json({message:'vehicle found succesffully :',data:resVehicle});
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
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
        const Newvehicle = await vehicle.create({
            photo: body.photo,
            description: body.description,
            model: body.model,
            registration_number: body.registration_number,
            seats: body.seats,
            rent: body.rent,
            user_id: body.user_id
        })
        res.status(201).json({message:'created succesffuely',data:Newvehicle})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
