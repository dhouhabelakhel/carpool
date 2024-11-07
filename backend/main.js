const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes=require('./Routes/UserRoutes');
const vehicleRoutes=require('./Routes/vehicleRoutes')
const rentalOfferRoutes=require('./Routes/RentalOfferRoutes')
const tripOffersRoutes=require('./Routes/TripOfferRoutes')
const tripReservationRoutes=require('./Routes/ReservationRoute')
const port = 3000;
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/vehicles',vehicleRoutes)
app.use('/api/rentalOffers',rentalOfferRoutes)
app.use('/api/tripOffers',tripOffersRoutes)
app.use('/api/TripReservation',tripReservationRoutes)
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
