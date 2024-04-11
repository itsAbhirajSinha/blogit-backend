const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json("You are not authenticated!");
    }

    try {
        const data = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });

        req.userId = data._id;
        next();
    } catch (err) {
        return res.status(403).json("Token is not valid!");
    }
};

module.exports = verifyToken;
