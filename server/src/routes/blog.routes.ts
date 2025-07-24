import { Router } from "express";
import {
	createBlog,
	getAllBlogs,
	updateBlog,
} from "../controllers/blog.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { uploadImage } from "../middlewares/upload.middleware";
import {
	validateBlogPatch,
	validateBlogPost,
} from "../middlewares/validation.middleware";

const router = Router();

router.get("/blogs", getAllBlogs);

router.post(
	"/blogs",
	authenticateJWT,
	uploadImage.single("image"),
	validateBlogPost,
	createBlog,
);

router.put(
	"/blogs/:id",
	authenticateJWT,
	uploadImage.single("image"),
	validateBlogPatch,
	updateBlog,
);

export default router;
