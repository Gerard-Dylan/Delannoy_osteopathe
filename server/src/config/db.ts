import dotenv from "dotenv";
import mysql, { type Pool } from "mysql2/promise";

dotenv.config();

export const pool: Pool = mysql.createPool({
	host: process.env.DB_HOST,
	port: Number.parseInt(process.env.DB_PORT || "3306", 10),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
});
