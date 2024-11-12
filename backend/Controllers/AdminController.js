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
exports.update = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;

        const admin = await Admin.findOne({ where: { id } });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found!' });
        } else {
            if (body.password) {
                // Compare old password with stored password
                const isCompatiblePasswords = await bcrypt.compare(body.old_password, admin.password);
                if (isCompatiblePasswords) {
                    body.password = await bcrypt.hash(body.password, 10);
                } else {
                    return res.status(400).json({ message: 'Incorrect old password!' });
                }
            }

            if (req.file && req.file.path) {
                body.photo = req.file.path.replace(/\\/g, '/'); // Save photo path if provided
            }

            // Update the admin record
            await Admin.update(body, { where: { id } });
            const updatedAdmin = await Admin.findOne({ where: { id } });

            res.status(200).json({ message: 'Admin updated successfully', data: updatedAdmin });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin login (Authentication)
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

        // Generate JWT token
        const token = jwt.sign({ adminId: admin.id, username: admin.username }, 'your_secret_key', { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            token: token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

