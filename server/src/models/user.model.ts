import type { RowDataPacket } from "mysql2";
import { pool } from "../config/db";

interface User extends RowDataPacket {
	id_user: number;
	email: string;
	password_hash: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const [rows] = await pool.query<User[]>(
		"SELECT * FROM user WHERE email = ?",
		[email],
	);

	return rows.length > 0 ? rows[0] : null;
}
