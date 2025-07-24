import { Router } from "express";
import { createBlog, getAllBlogs } from "../controllers/blog.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { uploadImage } from "../middlewares/upload.middleware";
import { validateBlogPost } from "../middlewares/validation.middleware";

const router = Router();

router.get("/blogs", getAllBlogs);

router.post(
	"/blogs",
	authenticateJWT,
	uploadImage.single("image"),
	validateBlogPost,
	createBlog,
);

export default router;
