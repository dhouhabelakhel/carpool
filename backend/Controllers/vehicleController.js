const vehicle = require('../Models/vehicle')
const FileModel = require('../models/FileModel');
exports.getAllVehicle = async (req, res) => {
    try {
        const vehicles = await vehicle.findAll();
        if (!vehicles||vehicles.length == -1) {
            res.status(201).send({message:'any vehicle found!!'})
        } else
            res.status(201).send(vehicles)
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}
exports.getVehicleByUser = async (req, res) => {
    try {
        const id = req.params.id;
        const resVehicle = await vehicle.findAll({ where: { user_id: id } });
        if (!resVehicle) {
            res.status(400).send({ message: 'not found!!' })
        } else {
            res.status(200).send({message:'vehicle found succesffully :',data:resVehicle});
        }
    } catch (error) {
        res.status(500).send({ error: error.message })
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
        FileModel.saveFile(req.file, (err) => { 
            if (err) {
            return res.status(500).send('Error saving file.');
          }})
        res.status(201).send({message:'created succesffuely',data:Newvehicle})
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
