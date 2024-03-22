const mongoose = require('mongoose');
let User;

const connectDatabase = async () => {
    try {
        if (!User) {
            User = mongoose.model('simulacro/Users', require('../model/userModel').schema);
        };

        await mongoose.connect('mongodb+srv://sepulvedagiraldocamila:IAw9xmtt7wXcTtIL@db-1.idpnodb.mongodb.net/')
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => console.log(err));

        await initializeData();

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

const initializeData = async () => {
    try {
        await User.deleteMany();

        const usersData = [
            {
                userId: 1,
                name: 'Cami',
                email: 'cami@gmail.com',
                password: 'Cami123'
            },
            {
                userId: 2,
                name: 'Mariana',
                email: 'mariana@gmail.com',
                password: 'Mariana123'
            }
        ];

        await User.insertMany(usersData);
        console.log('Data successfully initialized');
    } catch (error) {
        console.error('Data initialization error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;