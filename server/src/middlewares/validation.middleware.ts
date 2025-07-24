import type { NextFunction, Request, Response } from "express";

export const validateBlogPost = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { title, content } = req.body;
	if (!title || !content) {
		return res.status(400).json({ message: "Titre et contenu requis." });
	}
	next();
};

export const validateBlogPatch = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { title, content } = req.body;
	const file = req.file;

	if (!title && !content && !file) {
		return res.status(400).json({
			message:
				"Aucun champ à mettre à jour. Fournir au moins un titre, un contenu ou une image.",
		});
	}

	next();
};
