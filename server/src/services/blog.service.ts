import fs from "fs";
import path from "path";
import type { RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import type { BlogWithImage } from "../models/blog.model";
import {
	findAllWithImage,
	insertBlog,
	insertImage,
	updateBlogPartialInDb,
} from "../models/blog.model";

interface BlogUpdateFields {
	title?: string;
	content?: string;
	image?: Express.Multer.File;
}

// Récupération de tous les articles avec image jointe
export const getAllBlogs = async () => {
	const blogs: BlogWithImage[] = await findAllWithImage();

	return blogs.map((blog) => ({
		id: blog.id_blog,
		title: blog.title,
		content: blog.content,
		createdAt: blog.created_at,
		updatedAt: blog.updated_at,
		image: blog.path || null,
		alt: blog.alt_text || "",
	}));
};

// Création d’un nouvel article
export const createBlog = async (
	title: string,
	content: string,
	image: Express.Multer.File | undefined,
	id_user: number,
): Promise<number> => {
	const id_blog = await insertBlog(title, content, id_user);

	if (image) {
		const path = `/images/imgblog/${image.filename}`;
		const alt = title.slice(0, 60);
		await insertImage(path, alt, id_blog);
	}

	return id_blog;
};

// Mise à jour partielle d’un article : titre, contenu et/ou image
export const updateBlog = async (
	id_blog: number,
	fields: BlogUpdateFields,
): Promise<void> => {
	const data: {
		title?: string;
		content?: string;
		image?: { path: string; alt_text: string };
	} = {};

	if (fields.title) data.title = fields.title;
	if (fields.content) data.content = fields.content;

	if (fields.image) {
		data.image = {
			path: `/images/imgblog/${fields.image.filename}`,
			alt_text: fields.title?.slice(0, 60) || "Image d’article mise à jour",
		};
	}

	await updateBlogPartialInDb(id_blog, data);
};

// Suppression d’un article + image liée
export const deleteBlog = async (id_blog: number): Promise<void> => {
	const conn = await pool.getConnection();
	try {
		await conn.beginTransaction();

		// Récupérer les chemins des images
		const [images] = await conn.query<RowDataPacket[]>(
			"SELECT path FROM image WHERE id_blog = ?",
			[id_blog],
		);

		for (const img of images) {
			const imgPath = path.join(__dirname, "../../public", img.path);
			if (fs.existsSync(imgPath)) {
				fs.unlinkSync(imgPath);
			}
		}

		// Supprimer d'abord les entrées dans la table image
		await conn.query("DELETE FROM image WHERE id_blog = ?", [id_blog]);

		// Supprimer l’article
		await conn.query("DELETE FROM blog WHERE id_blog = ?", [id_blog]);

		await conn.commit();
	} catch (err) {
		await conn.rollback();
		throw err;
	} finally {
		conn.release();
	}
};
