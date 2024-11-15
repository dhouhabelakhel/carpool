const express = require('express');
const Router = express.Router();
const adminController = require('../Controllers/AdminController'); // Use AdminController instead of UserController
const multer = require('multer');
const path = require('path');

// Multer storage configuration for file uploads (photo is optional)
const storage = multer.diskStorage({
    destination: 'uploads/admins', // Change directory to 'uploads/admins'
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // File naming convention
    }
});

// Multer configuration with file size limit (10MB)
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Routes for Admin actions
Router.get('/', adminController.getAllAdmins); // Get all admins
Router.get('/:id', adminController.getAdminByID); // Get a single admin by ID

Router.post('/', adminController.register); // Admin registration
Router.post('/auth', adminController.auth); // Admin login
Router.put('/:id', upload.single('photo'), adminController.updateAdmin); // Admin profile update (with optional photo upload)

module.exports = Router;