const jwt = require('jsonwebtoken');
const secretKey = "!s#e%c&r(e@t$^*)";


function createToken(user) {
    return jwt.sign({_id: user._id}, secretKey);
}

function verifyToken(token) {
    if(!token) return null;
    return jwt.verify(token, secretKey);
}


module.exports = {
    createToken,
    verifyToken,
}