const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes=require('./Routes/UserRoutes');
const vehicleRoutes=require('./Routes/vehicleRoutes')
const rentalOfferRoutes=require('./Routes/RentalOfferRoutes')
const stationRoutes=require('./Routes/StationRouter');
const port = 3000;
app.use(cors());
app.use(express.json());
app.use('/api/users',UserRoutes);
app.use('/api/vehicles',vehicleRoutes)
app.use('/api/rentalOffers',rentalOfferRoutes)
app.use('/api/stations',stationRoutes)
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
