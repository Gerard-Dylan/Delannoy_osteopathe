import express from "express";
import { loginAdmin } from "../controllers/auth.controller";

const router = express.Router();

router.post("/connexion-delannoy-osteo", loginAdmin);



export default router;
