import { Router } from "express";
import * as blogController from "../controllers/blog.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { uploadImage } from "../middlewares/upload.middleware";
import {
	validateBlogDelete,
	validateBlogPatch,
	validateBlogPost,
} from "../middlewares/validation.middleware";

const router = Router();

router.get("/blogs", blogController.getAllBlogs);

router.post(
	"/blogs",
	authenticateJWT,
	uploadImage.single("image"),
	validateBlogPost,
	blogController.createBlog,
);

router.put(
	"/blogs/:id",
	authenticateJWT,
	uploadImage.single("image"),
	validateBlogPatch,
	blogController.updateBlog,
);

router.delete(
	"/blogs/:id",
	authenticateJWT,
	validateBlogDelete,
	blogController.deleteBlog,
);

export default router;
