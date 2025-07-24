import axios from "axios";
import type React from "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { LoginContext } from "../../contexts/LoginContext";
import "react-toastify/dist/ReactToastify.css";
import "./BlogCreateForm.css";

const BlogCreateForm = () => {
	const { isAdmin } = useContext(LoginContext);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState<File | null>(null);

	if (!isAdmin) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		if (image) formData.append("image", image);

		try {
			const res = await axios.post(
				"http://localhost:3000/api/blogs",
				formData,
				{
					withCredentials: true,
					headers: { "Content-Type": "multipart/form-data" },
				},
			);

			toast.success(res.data.message || "Article créé !");
			setTitle("");
			setContent("");
			setImage(null);
		} catch (err) {
			console.error(err);
			toast.error("Erreur lors de la création de l'article.");
		}
	};

	return (
		<form className="blog-create-form" onSubmit={handleSubmit}>
			<h2>Créer un nouvel article</h2>

			<input
				type="file"
				accept="image/*"
				onChange={(e) => {
					if (e.target.files) setImage(e.target.files[0]);
				}}
			/>

			<input
				type="text"
				placeholder="Titre"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>

			<textarea
				placeholder="Contenu"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={6}
				required
			/>

			<button type="submit">Publier</button>
		</form>
	);
};

export default BlogCreateForm;
