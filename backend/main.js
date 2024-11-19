const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./Routes/UserRoutes');
const vehicleRoutes = require('./Routes/vehicleRoutes');
const rentalOfferRoutes = require('./Routes/RentalOfferRoutes');
const tripOffersRoutes = require('./Routes/TripOfferRoutes');
const tripReservationRoutes = require('./Routes/ReservationRoute');
const http = require('http');
const socketIo = require('socket.io');

const port = 3000;
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use((req, res, next) => {
    req.io = io; 
    next();
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/rentalOffers', rentalOfferRoutes);
app.use('/api/tripOffers', tripOffersRoutes);
app.use('/api/TripReservation', tripReservationRoutes);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
