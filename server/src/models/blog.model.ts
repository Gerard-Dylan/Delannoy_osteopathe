import type { ResultSetHeader, RowDataPacket } from "mysql2";
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

export const insertBlog = async (
	title: string,
	content: string,
	id_user: number,
): Promise<number> => {
	const [result] = await pool.execute<ResultSetHeader>(
		`INSERT INTO blog (title, content, id_user) VALUES (?, ?, ?)`,
		[title, content, id_user],
	);
	return result.insertId;
};

export const insertImage = async (
	path: string,
	alt_text: string,
	id_blog: number,
): Promise<void> => {
	await pool.execute(
		`INSERT INTO image (path, alt_text, id_blog) VALUES (?, ?, ?)`,
		[path, alt_text, id_blog],
	);
};
