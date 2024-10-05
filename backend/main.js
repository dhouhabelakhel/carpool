const express = require('express');
const app = express();
const User =require('./Models/User');
const UserRoutes=require('./Routes/UserRoutes')
const port = 3000;
app.use(express.json());
app.use('/api/users',UserRoutes);
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);

});
