import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Routes
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";

dotenv.config();

const app = express();

// Middlewares globaux
app.use(express.json());
app.use(cookieParser());

// CORS (à adapter en prod)
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Accès aux images statiques
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Routes API
app.use("/api", authRoutes);
app.use("/api", blogRoutes);

// Route test
app.get("/", (_req, res) => {
    res.send("API Ostéo opérationnelle ✅");
});

// Debug (routes chargées)
console.log("✅ authRoutes loaded depuis :", __dirname);
console.log("📂 Routes disponibles dans /api :", [
    ...authRoutes.stack.map((r) => r.route?.path),
    ...blogRoutes.stack.map((r) => r.route?.path),
]);

export default app;
