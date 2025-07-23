import { Request, Response } from "express";
import argon2 from "argon2";
import { getUserByEmail } from "../models/user.model";
import { generateToken } from "../services/jwt.service";

export async function loginAdmin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Identifiant invalide" });
        }

        const passwordValid = await argon2.verify(user.password_hash, password);

        if (!passwordValid) {
            return res.status(401).json({ error: "Mot de passe invalide" });
        }

        const token = generateToken({ id_user: user.id_user });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 2, // 2h
        });

        res.status(200).json({ message: "Connexion réussie" });
    } catch (err) {
        console.error("Erreur login:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
