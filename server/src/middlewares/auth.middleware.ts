import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.service";

interface AuthenticatedRequest extends Request {
    auth?: { id_user: number };
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: "Non authentifié (token manquant)" });
    }

    try {
        const decoded = verifyToken(token);
        req.auth = { id_user: decoded.id_user };
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalide ou expiré" });
    }
}
