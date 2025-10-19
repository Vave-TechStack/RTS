import jwt from 'jsonwebtoken';
import { pool } from '../config/init_db.js';

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.token = token;
        req.decoded = decoded;
        const [rows] = await pool.query(
            'SELECT id, email FROM users WHERE token = ? AND email = ?',
            [token, decoded.email]
        );
        if (rows.length === 0) {
            return res.status(403).json({ message: 'Invalid token or user not found' });
        }
        // Valid token and user found, proceed
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                statusCode: '401',
                message: 'Access Token Expired. Please login again.',
            });
        }
        return res.status(403).json({
            statusCode: '403',
            message: 'Invalid Access Token',
        });
    }
};

export default verifyToken;
