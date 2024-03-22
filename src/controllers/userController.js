const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = "##mial%?leg##%!";

const userController = {

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await User.findOne({id: userId});
            res.json(user);
        } catch (error) {
            console.error('Error bringing User:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, email, password } = req.body;
            const userData = await User.findOneAndUpdate({id: userId}, {$set: { name: name, email: email, password: password}});
            res.json(userData);
        } catch (error) {
            console.error('error updating User:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createUser: async (req, res) => {
        const userData = req.body;
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteUser: async(req, res) => {
        try {
            const { userId } = req.params;
            const deletedUser = await User.findOneAndDelete({id: userId});
            res.json(deletedUser);
        } catch (error) {
            console.error('error deleting User:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    register: async (req, res) => {
        try {
            const users = await User.find();
            const { name, email, password } = req.body;

            const userData = {
                userId : users.length + 1,
                name: name,
                email: email,
                // password: password
                password: await bcrypt.hash(password, 10)
            };

            const newUser = new User(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);

        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.find({email: email});

            if(!user) {
                return res.status(401).json({message: 'The user does not exist'});
            };

            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            // VERIFICAR PORQUE NO DA
            // if (!isPasswordValid) {
            //     return res.status(400).json({message: "email or password incorrect"});
            // }

            const token = jwt.sign({userId: user.id}, jwt_secret, {
                expiresIn: '1h'
            });

            res.json({message: 'Logged in successfully', token})
        } catch (error) {
            console.error('User login error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = userController;