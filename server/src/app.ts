import { pool } from "./config/db";

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connexion à la base de données réussie");
        connection.release();
    } catch (err) {
        console.error("❌ Échec de connexion à la base de données :", err);
        process.exit(1);
    }
})();
