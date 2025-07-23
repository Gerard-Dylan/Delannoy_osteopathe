import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS (à ajuster avec origine du client en prod)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Dossier public pour les images
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Routes API
app.use("/api", authRoutes);

// Test route (optionnelle à supprimer plus tard)
app.get("/", (req, res) => {
    res.send("API Ostéo opérationnelle ✅");
});

console.log("✅ authRoutes loaded depuis :", __dirname);
console.log("📂 Routes disponibles dans /api :", authRoutes.stack.map((r) => r.route?.path));


export default app;
