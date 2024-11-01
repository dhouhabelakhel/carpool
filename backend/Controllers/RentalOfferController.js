const rentalOffer = require('../Models/RentalOffer');
const vehicle = require('../Models/vehicle');
exports.addRentalOffer = async (req, res) => {
   try {
      body = req.body;

      const newRenatlOffer = await rentalOffer.create({
         rental_date: body.rental_date,
         description: body.description,
         price: body.price,
         start_date: body.start_date,
         duration: body.duration,
         isAvailable: body.isAvailable,
         vehicle_id: body.vehicle_id
      })
      res.status(200).send(newRenatlOffer);
   } catch (error) {
      res.status(500).send({ error: error.message })
   }
}
exports.getRentalOfferByVehicle = async (req, res) => {
   try {
      const vehicle = req.params.vehicle_id;
      const resRental = await rentalOffer.findAll({ where: { vehicle_id: vehicle } })
      if (!resRental || rentalOffer.length == -1) {

         res.status(400).send({ message: 'not found!!!' });
      } else {
         res.status(200).send({ message: 'rental offer found succesffully :', data: resRental })
      }
   }
   catch (error) {
      res.status(500).send({ error: error.message });
   }
}
exports.getAvailableRentalOffer = async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;
      const limit = size;
      const resRental = await rentalOffer.findAll(
         {
            where: { isAvailable: 1 },
            offset: offset,
            limit: limit
         })
        
      if (!resRental || resRental.length == -1) {

         res.status(400).send({ message: 'any available rental offer found' });
      } else {
         res.status(200).send({
            items: limit,
            page: page,
            message: 'rental offers found succesffully :',
            data: resRental
         })
      }
   }
   catch (error) {
      res.status(500).send({ error: error.message });
   }
}
exports.getSortedRentalOffer = async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;
      const limit = size;
      const sortOrder = req.query.order === 'desc' ? 'DESC' : 'ASC';
      const resRental = await rentalOffer.findAll({
         where: { isAvailable: 1 },
         order: sortOrder,
         offset:offset,
         limit:limit
      })
      if (!resRental || resRental.length == 1) {

         res.status(400).send({ message: 'any available rental offer found' });
      } else {
         res.status(200).send({ message: 'rental offers found succesffully :', data: resRental })
      }
   }
   catch (error) {
      res.status(500).send({ error: error.message });
   }
}
exports.getRentalOfferByDate=async(req,res)=>{
   try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const offset = (page - 1) * size;
      const limit = size;
    const date=req.params.rental_date;
    const resRental = await rentalOffer.findAll({
      where: { rental_date: date },
      offset:offset,
      limit:limit
   })   
   if (!resRental || resRental.length == -1) {

      res.status(400).send({ message: 'any available rental offer found in this date' });
   } else {
      res.status(200).send({ message: 'rental offers found succesffully :', data: resRental })
   }

   } catch (error) {
      res.status(500).send({ error: error.message });  
   }
}
