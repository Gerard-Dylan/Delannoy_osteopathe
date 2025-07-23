import type { Request, Response } from "express";
import * as blogService from "../services/blog.service";

export const getAllBlogs = async (_req: Request, res: Response) => {
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
