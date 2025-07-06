import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, login again'
        });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecoded.id) {
            req.userId = tokenDecoded.id;
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, login again'
            });
        }
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export default userAuth;
