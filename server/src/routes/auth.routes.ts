import express from "express";
import {
	getProfile,
	loginAdmin,
	logoutAdmin,
} from "../controllers/auth.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = express.Router();

// Connexion admin via route cachée
router.post("/connexion-delannoy-osteo", loginAdmin);

// Déconnexion admin : suppression du cookie JWT
router.post("/connexion/logout", logoutAdmin);

// Vérification de session (profil admin)
router.get("/connexion/profile", authenticateJWT, getProfile);

export default router;
