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
