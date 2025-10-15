
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jwt');


const handleUserSignup = async(req, res) => {
    try {        
        let success = false;
        const { email, username, password } = req.body;

        // check for registered user
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({success, error: "Email already registered"});
        }
        
        // password hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({email, username, password:secPass});
        await newUser.save();

        return res.status(201).json({ success:true, message:"New User created successfully!"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internsl Server Error 1"});
    }

}

const handleUserLogin = async(req, res) => {
    let success = false;
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({success, error:"Invalid creadentials"});
        }

        // password security
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(401).json({success, error:"Invalid creadentials"});
        }

        // jwt secure token
        const authToken = createToken(user);
        // Set token in the response header
        // res.setHeader('Authorization', `Bearer ${authToken}`);

        return res.json({success:true, message:"User logged in successfully!", authToken});
    } catch(error) {
        console.error(error);
        return res.status(500).json({error: "Internsl Server Error"});
    }
}

module.exports = {
    handleUserLogin,
    handleUserSignup,
};