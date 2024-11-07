const tripReservation = require('../Models/Reservation')
const TripOffer = require('../Models/TripOffer')
exports.create = async (req, res) => {
    const { body } = req;
    try {
        const id = body.trip_offer
        const tripOffer = await TripOffer.findOne({ where: { id } })
        price = parseInt(body.reservation_seats) * parseInt(tripOffer.price);
        const reservation = await tripReservation.create({
            reservation_date: body.reservation_date,
            reservation_seats: body.reservation_seats,
            status: body.status,
            total_price: price,
            trip_offer: body.trip_offer
        })
        if (reservation) {
            res.status(200).json({ message: 'reservation added succesfully', data: reservation })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
exports.update = async (req, res) => {
    try {
        body = req.body;
        id = req.params.id;
        const tripOfferID = body.trip_offer
        const tripOffer = await TripOffer.findOne({ where: { id: tripOfferID } })
        const reservation = await tripReservation.findOne({ where: { id } });
        if (!reservation) {
            res.status(404).json({ message: 'any reservation Offer found!!' })
        } else {
            if (body.reservation_seats) {
                const newPrice = parseInt(body.reservation_seats) * parseInt(tripOffer.price);
                await tripReservation.update({ total_price: newPrice }, { where: { id } });
            }

            await tripReservation.update(body, { where: { id } });
            const updatedReservation = await tripReservation.findOne({ where: { id } });
            res.status(200).json({ message: 'reservation updated succefully', data: updatedReservation })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
exports.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await tripReservation.findOne({ where: { id } })
        if (reservation) {
            tripReservation.destroy({ where: { id } });
            return res.status(200).json({ message: 'reservation deleted succesfully' })
        }
        return res.status(404).json({ message: 'any reservation found' })
    } catch (error) {
        res.status(500).json({ message: error })

    }
}