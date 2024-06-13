import jwt from "jsonwebtoken";
import { development } from '../config/config.js';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    if (!development.jwt_code) {
        console.error('JWT secret is not defined in the configuration');
        return res.sendStatus(500);
    }

    jwt.verify(token, development.jwt_code, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export default authenticateToken;