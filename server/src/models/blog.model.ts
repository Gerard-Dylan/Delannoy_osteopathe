import type {
	PoolConnection,
	ResultSetHeader,
	RowDataPacket,
} from "mysql2/promise";
import { pool } from "../config/db";

export interface BlogWithImage extends RowDataPacket {
	id_blog: number;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
	path: string | null;
	alt_text: string | null;
}

// Récupérer tous les articles avec image associée (LEFT JOIN)
export const findAllWithImage = async (): Promise<BlogWithImage[]> => {
	const [rows] = await pool.query<BlogWithImage[]>(
		`SELECT
			 b.id_blog,
			 b.title,
			 b.content,
			 b.created_at,
			 b.updated_at,
			 i.path,
			 i.alt_text
		 FROM blog b
				  LEFT JOIN image i ON b.id_blog = i.id_blog
		 ORDER BY b.created_at DESC`,
	);
	return rows;
};

// Insérer un article et retourner son ID
export const insertBlog = async (
	title: string,
	content: string,
	id_user: number,
): Promise<number> => {
	const [result] = await pool.query<ResultSetHeader>(
		`INSERT INTO blog (title, content, id_user, created_at, updated_at)
		 VALUES (?, ?, ?, NOW(), NOW())`,
		[title, content, id_user],
	);
	return result.insertId;
};

// Associer une image à un article
export const insertImage = async (
	path: string,
	alt_text: string,
	id_blog: number,
): Promise<void> => {
	await pool.query(
		`INSERT INTO image (path, alt_text, id_blog)
		 VALUES (?, ?, ?)`,
		[path, alt_text, id_blog],
	);
};

// Mettre à jour partiellement un article et/ou son image
export const updateBlogPartialInDb = async (
	id_blog: number,
	data: {
		title?: string;
		content?: string;
		image?: {
			path: string;
			alt_text: string;
		};
	},
): Promise<void> => {
	const connection: PoolConnection = await pool.getConnection();

	try {
		await connection.beginTransaction();

		// MAJ du titre / contenu
		if (data.title || data.content) {
			const fields: string[] = [];
			const values: unknown[] = [];

			if (data.title) {
				fields.push("title = ?");
				values.push(data.title);
			}
			if (data.content) {
				fields.push("content = ?");
				values.push(data.content);
			}

			values.push(id_blog);

			await connection.query(
				`UPDATE blog SET ${fields.join(", ")}, updated_at = NOW() WHERE id_blog = ?`,
				values,
			);
		}

		// MAJ ou insertion de l'image
		if (data.image) {
			const [rows] = await connection.query<RowDataPacket[]>(
				`SELECT id_image FROM image WHERE id_blog = ?`,
				[id_blog],
			);

			if (rows.length > 0) {
				await connection.query(
					`UPDATE image SET path = ?, alt_text = ? WHERE id_blog = ?`,
					[data.image.path, data.image.alt_text, id_blog],
				);
			} else {
				await connection.query(
					`INSERT INTO image (path, alt_text, id_blog)
					 VALUES (?, ?, ?)`,
					[data.image.path, data.image.alt_text, id_blog],
				);
			}
		}

		await connection.commit();
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		connection.release();
	}
};
