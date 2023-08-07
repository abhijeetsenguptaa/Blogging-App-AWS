require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

const registeringUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, gender, role } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !age || !gender) {
            return res.status(400).json({
                status: 'false',
                error: 'Please provide all required fields.',
            });
        }

        // Check if the user already exists with the same email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                status: 'false',
                error: 'User with this email already exists.',
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            gender,
            role
        });

        // Return the created user information
        res.status(201).json({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            age: newUser.age,
            gender: newUser.gender,
            role: newUser.role
        });
    } catch (error) {
        console.error('Error while handling user registration:', error);
        res.status(500).json({
            status: 'false',
            error: 'Failed to register the user.',
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: 'false',
                error: 'Please provide email and password.',
            });
        }

        // Find the user with the provided email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: 'false',
                error: 'Invalid credentials.',
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 'false',
                error: 'Invalid credentials.',
            });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user.id }, "abhijeet", {
            expiresIn: '1h', // Token expires in 1 hour
        });

        // Return the user information along with the JWT token
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            gender: user.gender,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error('Error while handling user login:', error);
        res.status(500).json({
            status: 'false',
            error: 'Failed to authenticate.',
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: 'false',
                error: 'Please provide email and new password.',
            });
        }

        // Find the user with the provided email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                status: 'false',
                error: 'User not found.',
            });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the user's password
        await user.update({ password: hashedPassword });

        // Return success message
        res.status(200).json({
            status: 'true',
            message: 'Password reset successful.',
        });
    } catch (error) {
        console.error('Error while handling password reset:', error);
        res.status(500).json({
            status: 'false',
            error: 'Password reset failed.',
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        let options = {};

        let { gender, sort, order } = req.query;

        // Prepare the options for querying the database
        if (gender) {
            options.where = { gender: gender.toLowerCase() };
        }

        if (sort === 'age') {
            options.order = [['age', order === 'desc' ? 'DESC' : 'ASC']];
        } else if (sort === 'time') {
            options.order = [['createdAt', order === 'desc' ? 'DESC' : 'ASC']];
        }

        // Fetch all users from the database based on the provided options
        const users = await User.findAll(options);

        // Return the user information
        res.status(200).json(users);
    } catch (error) {
        console.error('Error while fetching all users:', error);
        res.status(500).json({
            status: 'false',
            error: 'Failed to fetch users.',
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: 'false',
                error: 'User not found.',
            });
        }

        // Return the user information
        res.status(200).json(user);
    } catch (error) {
        console.error('Error while fetching user by ID:', error);
        res.status(500).json({
            status: 'false',
            error: 'Failed to fetch user.',
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: 'false',
                error: 'User not found.',
            });
        }

        // Delete the user
        await user.destroy();

        // Return success message
        res.status(200).json({
            message: 'User deleted successfully.',
        });
    } catch (error) {
        console.error('Error while deleting user by ID:', error);
        res.status(500).json({
            status: 'false',
            error: 'Failed to delete user.',
        });
    }
};

const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, age, gender } = req.body;

        // Validate if at least one field to update is provided
        if (!firstName && !lastName && !email && !age && !gender) {
            return res.status(400).json({
                status: 'false',
                error: 'Please provide at least one field to update.',
            });
        }

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: 'false',
                error: 'User not found.',
            });
        }

        // Update the user information
        await user.update({
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            age: age || user.age,
            gender: gender || user.gender,
        });

        // Return success message
        res.status(200).json({
            message: 'User information updated successfully.',
        });
    } catch (error) {
        console.error('Error while updating user by ID:', error);
        res.status(500).json({
            status: 'false',
            error: 'Failed to update user information.',
        });
    }
};

module.exports = {
    registeringUser,
    loginUser,
    resetPassword,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    // Add other controller functions here if needed
};
