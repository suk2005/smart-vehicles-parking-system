const { verifyToken } = require('../utils/jwt');
const User = require('../models/userModel')

const userVerification = async (req, res, next) => {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ status:false, error: 'Unauthorized request' });
    }
    try {
        const userID = verifyToken(token);
        
        const user = await User.findById(userID).select("-password");
        if (!user) {
            return res.status(404).json({ status:false, error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({ status:false, error: 'Invalid token' });
    }
}


module.exports = userVerification;