import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import * as blogService from "../services/blog.service";

export const getAllBlogs = async (
	_req: AuthenticatedRequest,
	res: Response,
) => {
	try {
		const blogs = await blogService.getAllBlogs();
		res.status(200).json(blogs);
	} catch (error) {
		console.error("Erreur getAllBlogs:", error);
		res.status(500).json({
			message: "Erreur serveur lors de la récupération des articles.",
		});
	}
};

export const createBlog = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { title, content } = req.body;
		const image = req.file;
		const userId = req.auth?.id_user;

		if (!userId) {
			return res.status(401).json({ message: "Non autorisé." });
		}

		const id_blog = await blogService.createBlog(title, content, image, userId);
		res.status(201).json({ message: "Article créé avec succès.", id_blog });
	} catch (error) {
		console.error("Erreur createBlog:", error);
		res
			.status(500)
			.json({ message: "Erreur serveur lors de la création de l’article." });
	}
};
