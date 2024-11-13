const TripOffer = require('../Models/TripOffer');
const User = require('../Models/User');  // Import the User model

// Controller to get all trip offers
// Controller to get a trip offer by ID
exports.getTripOfferById = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the trip offer by its ID
        const tripOffer = await TripOffer.findOne({
            where: { id },
            include: [{
                model: User,
                as: 'user', // Assuming you are including related User information
            }]
        });

        if (!tripOffer) {
            // If no trip offer is found
            return res.status(404).json({ message: 'Trip offer not found' });
        }

        // If trip offer is found, return the data
        res.status(200).json({
            message: 'Trip offer fetched successfully',
            data: tripOffer
        });

    } catch (error) {
        // Catch any unexpected errors
        res.status(500).send({ error: error.message });
    }
};

exports.GetAllTripOffers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const offset = (page - 1) * size;
        const limit = size;
        const { start_point, destination, trip_date, price } = req.query;
        const conditions = {};
  
        if (start_point) {
           conditions.start_point = start_point;
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

        const offers = await TripOffer.findAll({
            where: conditions,
            offset: offset,
            limit: limit,
            include: [{
                model: User,
                as: 'user',
            }]
        });

        if (!offers || offers.length === 0) {
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

// Controller to add a new trip offer
exports.addTripOffer = async (req, res) => {
    try {
        const body = req.body;
        const NewOffer = await TripOffer.create({
            trip_date: body.trip_date,
            startTime: body.start_time, // Fix variable name if necessary
            price: body.price,
            places: body.places,
            isSmokingAllowed: body.isSmokingAllowed,
            user_id: body.user_id,
            destination: body.destination,
            start_point: body.start_point
        });

        if (!NewOffer) {
            res.send({ message: 'Failed to add the new offer!!' });
        } else {
            res.status(201).send({
                message: "Offer added successfully!!!",
                data: NewOffer
            });
        }  
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Controller to update a trip offer
exports.update = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const tripOffer = await TripOffer.findOne({ where: { id } });

        if (!tripOffer) {
            res.status(404).json({ message: 'No trip offer found!!' });
        } else {
            await TripOffer.update(body, { where: { id } });
            const updatedOffer = await TripOffer.findOne({ where: { id } });
            res.status(200).json({ message: 'Trip offer updated successfully', data: updatedOffer });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete a trip offer
exports.deleteTripOffer = async (req, res) => {
    try {
        const id = req.params.id;
        // First, find the trip offer to ensure it exists
        const tripOffer = await TripOffer.findOne({ where: { id } });

        if (!tripOffer) {
            return res.status(404).json({ message: 'No trip offer found to delete' });
        }

        // Delete the trip offer
        await TripOffer.destroy({ where: { id } });

        res.status(200).json({ message: 'Trip offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
