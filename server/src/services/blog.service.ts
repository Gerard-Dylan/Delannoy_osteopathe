import { findAllWithImage } from "../models/blog.model";

export const getAllBlogs = async () => {
	const blogs = await findAllWithImage();

	return blogs.map((blog) => ({
		id: blog.id_blog,
		title: blog.title,
		content: blog.content,
		createdAt: blog.created_at,
		updatedAt: blog.updated_at,
		image: blog.path || null,
		alt: blog.alt_text || "",
	}));
};
