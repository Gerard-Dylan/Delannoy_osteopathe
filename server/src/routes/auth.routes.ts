import express from "express";
import { getProfile, loginAdmin } from "../controllers/auth.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = express.Router();

// Route cachée pour connexion admin
router.post("/connexion-delannoy-osteo", loginAdmin);

// Vérification de session
router.get("/connexion/profile", authenticateJWT, getProfile);

export default router;
