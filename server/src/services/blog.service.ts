import {
	findAllWithImage,
	insertBlog,
	insertImage,
} from "../models/blog.model";

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

export const createBlog = async (
	title: string,
	content: string,
	image: Express.Multer.File | undefined,
	id_user: number,
): Promise<number> => {
	const id_blog = await insertBlog(title, content, id_user);

	if (image) {
		const path = `/images/imgblog/${image.filename}`;
		const alt = title.slice(0, 60); // alt text auto basé sur le titre
		await insertImage(path, alt, id_blog);
	}

	return id_blog;
};
