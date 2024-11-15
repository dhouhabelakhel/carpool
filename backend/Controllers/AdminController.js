const Admin = require('../Models/admin'); // Import Admin model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all admins with pagination
exports.getAllAdmins = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const offset = (page - 1) * size;
        const limit = size;

        const admins = await Admin.findAll({
            offset: offset,
            limit: limit
        });

        if (!admins || admins.length === 0) {
            return res.status(200).json({ message: 'No admins found!' });
        } else {
            return res.status(200).json({
                items: admins.length,
                page: page,
                message: 'Admins fetched successfully',
                data: admins
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get an admin by ID
exports.getAdminByID = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await Admin.findOne({ where: { id } });

        if (admin) {
            return res.status(200).json({ message: 'Admin found', data: admin });
        } else {
            return res.status(404).json({ message: 'Admin not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin registration
exports.register = async (req, res) => {
    try {
        const body = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const admin = await Admin.create({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            role: 'admin', // Default role set to 'admin'
        });

        res.status(201).json({ message: 'Admin created successfully', data: admin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Admin update (including password update)
exports.updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;  // Get admin ID from the URL
        const { username, email, password } = req.body;  // Get the updated details

        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // If a password is provided, hash it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);  // Hash the new password
        }

        // Update admin details
        admin.username = username || admin.username;
        admin.email = email || admin.email;

        await admin.save();  // Save the updated admin

        return res.status(200).json({ message: 'Admin updated successfully', admin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Admin login (Authentication)


// Assuming Admin model is imported here

exports.auth = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;

        // Find the admin by email
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Check if the password matches
        const isValidPassword = await bcrypt.compare(body.password, admin.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Update the lastLogin field to the current date and time
        admin.lastLogin = new Date(); // Set current date and time
        await admin.save(); // Save the admin record with the updated lastLogin

        // Generate JWT token
        const token = jwt.sign({ adminId: admin.id, username: admin.username }, 'your_secret_key', { expiresIn: '1h' });

        // Return the response with the token and lastLogin
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            lastLogin: admin.lastLogin // Optionally return the last login date
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

