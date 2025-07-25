import axios from "axios";
import type React from "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { LoginContext } from "../../contexts/LoginContext";
import type { BlogArticle } from "./BlogPage";
import "./BlogEditForm.css";

interface BlogEditFormProps {
	article: BlogArticle;
	onSuccess: () => void;
	onCancel: () => void;
}

const BlogEditForm = ({ article, onSuccess, onCancel }: BlogEditFormProps) => {
	const { isAdmin } = useContext(LoginContext);
	const [title, setTitle] = useState(article.title);
	const [content, setContent] = useState(article.content);
	const [image, setImage] = useState<File | null>(null);

	if (!isAdmin) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		if (title !== article.title) formData.append("title", title);
		if (content !== article.content) formData.append("content", content);
		if (image) formData.append("image", image);

		if (!formData.has("title") && !formData.has("content") && !image) {
			toast.warn("Aucune modification détectée.");
			return;
		}

		try {
			await axios.put(
				`http://localhost:3000/api/blogs/${article.id}`,
				formData,
				{
					withCredentials: true,
					headers: { "Content-Type": "multipart/form-data" },
				},
			);

			toast.success("Article mis à jour !");
			onSuccess();
		} catch (err) {
			console.error("Erreur lors de la mise à jour :", err);
			toast.error("Erreur lors de la mise à jour de l’article.");
		}
	};

	return (
		<form className="blog-edit-form" onSubmit={handleSubmit}>
			<h2>Modifier l'article</h2>

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
			/>

			<textarea
				placeholder="Contenu"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={6}
			/>

			<div className="form-actions">
				<button type="submit">Valider</button>
				<button type="button" onClick={onCancel}>
					Annuler
				</button>
			</div>
		</form>
	);
};

export default BlogEditForm;
