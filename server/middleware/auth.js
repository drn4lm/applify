import jwt from "jsonwebtoken";

/*--AUTH: Middleware that protects auth routes by requiring a user-specific bearer token--*/
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
