import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import {
	createBlog as createBlogService,
	deleteBlog as deleteBlogService,
	getAllBlogs as fetchAllBlogs,
	updateBlog as updateBlogService,
} from "../services/blog.service";

// GET /api/blogs – Récupérer tous les articles
export const getAllBlogs = async (
	_req: AuthenticatedRequest,
	res: Response,
) => {
	try {
		const blogs = await fetchAllBlogs();
		return res.status(200).json(blogs);
	} catch (error) {
		console.error("Erreur getAllBlogs:", error);
		return res.status(500).json({
			message: "Erreur serveur lors de la récupération des articles.",
		});
	}
};

// POST /api/blogs – Créer un nouvel article
export const createBlog = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { title, content } = req.body;
		const image = req.file;
		const userId = req.auth?.id_user;

		if (!userId) {
			return res.status(401).json({ message: "Non autorisé." });
		}

		const id_blog = await createBlogService(title, content, image, userId);

		return res.status(201).json({
			message: "Article créé avec succès.",
			id_blog,
		});
	} catch (error) {
		console.error("Erreur createBlog:", error);
		return res.status(500).json({
			message: "Erreur serveur lors de la création de l’article.",
		});
	}
};

// PUT /api/blogs/:id – Mettre à jour un article
export const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;

	if (!id || isNaN(Number(id))) {
		return res.status(400).json({ error: "ID invalide" });
	}

	try {
		const { title, content } = req.body;
		const image = req.file;

		await updateBlogService(Number(id), {
			title,
			content,
			image,
		});

		return res.status(200).json({
			message: "Article mis à jour avec succès.",
		});
	} catch (error) {
		console.error("Erreur updateBlog:", error);
		return res.status(500).json({
			error: "Erreur serveur lors de la mise à jour de l'article.",
		});
	}
};

// DELETE /api/blogs/:id – Supprimer un article
export const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
	const blogId = Number(req.params.id);

	if (isNaN(blogId)) {
		return res.status(400).json({ message: "ID invalide." });
	}

	try {
		await deleteBlogService(blogId);
		return res.status(200).json({ message: "Article supprimé." });
	} catch (error) {
		console.error("Erreur deleteBlog:", error);
		return res.status(500).json({
			message: "Erreur serveur lors de la suppression de l’article.",
		});
	}
};
