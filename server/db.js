const mongoose = require('mongoose');
// require('dotenv').config();

const MONGO_URL = 'mongodb://localhost:27017/sl-parking-app'; // Replace with your MongoDB connection string
// const { MONGO_URL } = process.env;
const connectToMongoDB = async() => {
    try {        
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB successfully")
        // .then(() => console.log("Connected to MongoDB successfully"))
        // .catch((err) => console.error("Failed to connect to MongoDB", err));
    } catch (error) {
        console.error("Failed to connect to MongoDB", error)
    }
};

module.exports = connectToMongoDB;
