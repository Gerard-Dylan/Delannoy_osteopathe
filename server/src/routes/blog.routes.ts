import { Router } from "express";
import { getAllBlogs } from "../controllers/blog.controller";

const router = Router();

router.get("/blogs", getAllBlogs);

export default router;
