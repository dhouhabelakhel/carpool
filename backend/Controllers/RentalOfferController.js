const rentalOffer = require('../Models/RentalOffer');
const vehicle = require('../Models/vehicle')
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
      const sortOrder = req.query.order === 'desc' ? 'DESC' : 'ASC';
      const offset = (page - 1) * size;
      const limit = size;
      const { rental_date, price, model } = req.query;
      const conditions = {};

      if (rental_date) {
         conditions.rental_date=rental_date;
      }

      if (price) {
         conditions.price = price;
      }
      conditions.isAvailable=1;
      const vehicleConditions = {};
      if (model) {
         vehicleConditions.model = model;
      }
      const resRental = await rentalOffer.findAll(
         {
            where: conditions ,
            offset: offset,
            limit: limit,
            include: [
               {
                  model: vehicle,
                  as: 'vehicle',
                  where: vehicleConditions

               }
            ]
         })
      if (!resRental || resRental.length == 0) {

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

