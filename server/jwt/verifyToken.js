const jwt = require('jsonwebtoken');
const secretKey = '3vf3fdmkmiekfmzkwo3pk4okm32kn3n42knk'; 

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
