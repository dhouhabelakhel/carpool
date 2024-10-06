const express = require('express');
const app = express();
const User =require('./Models/User');
const UserRoutes=require('./Routes/UserRoutes');
const vehicleRoutes=require('./Routes/vehicleRoutes')
const RentalOfferRoutes=require('./Routes/RentalOfferRoutes')
const port = 3000;
app.use(express.json());
app.use('/api/users',UserRoutes);
app.use('/api/vehicles',vehicleRoutes)
app.use('/api/rentalOffer',RentalOfferRoutes)
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);

});
