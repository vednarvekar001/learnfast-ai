import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const checkAuth = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: 'Unauthorized access, Please login'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = {id: decoded.userId}; 
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({message: 'Invalid token, Please login again'});
    }

}

export default checkAuth; // Export the middleware function for use in routes
// This middleware checks for a valid JWT token in the cookies and decodes it to get the user ID.

