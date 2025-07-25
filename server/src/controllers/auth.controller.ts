import argon2 from "argon2";
import type { Request, Response } from "express";
import { getUserByEmail } from "../models/user.model";
import { generateToken } from "../services/jwt.service";

// Interface pour les requêtes avec auth injecté par le middleware
interface RequestWithAuth extends Request {
	auth?: {
		id_user: number;
	};
}

// Connexion de l’admin
export async function loginAdmin(req: Request, res: Response) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email et mot de passe requis" });
	}

	try {
		const user = await getUserByEmail(email);

		if (!user) {
			return res.status(401).json({ error: "Identifiants invalides" });
		}

		const passwordValid = await argon2.verify(user.password_hash, password);

		if (!passwordValid) {
			return res.status(401).json({ error: "Identifiants invalides" });
		}

		const token = generateToken({ id_user: user.id_user });

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 1000 * 60 * 60 * 2,
		});

		return res.status(200).json({ message: "Connexion réussie" });
	} catch (err) {
		console.error("Erreur login:", err);
		return res.status(500).json({ error: "Erreur serveur" });
	}
}

// Récupération du profil admin connecté
export function getProfile(req: RequestWithAuth, res: Response) {
	if (!req.auth?.id_user) {
		return res.status(401).json({ error: "Non authentifié" });
	}

	return res.status(200).json({
		id_user: req.auth.id_user,
		isAdmin: true,
	});
}

// Déconnexion de l’admin
export function logoutAdmin(_req: Request, res: Response) {
	res.clearCookie("token", {
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});
	return res.status(200).json({ message: "Déconnexion réussie" });
}
