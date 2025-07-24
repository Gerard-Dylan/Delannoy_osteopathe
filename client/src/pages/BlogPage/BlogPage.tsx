import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { LoginContext } from "../../contexts/LoginContext";
import BlogCreateForm from "./BlogCreateForm";
import "./BlogPage.css";

interface BlogArticle {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	image: string | null;
	alt: string;
}

const BlogPage = () => {
	const [articles, setArticles] = useState<BlogArticle[]>([]);
	const [showForm, setShowForm] = useState(false);
	const { isAdmin } = useContext(LoginContext);

	// récup des articles depuis l'API
	const fetchArticles = async () => {
		try {
			const res = await axios.get<BlogArticle[]>(
				"http://localhost:3000/api/blogs",
				{ withCredentials: true },
			);
			setArticles(res.data);
		} catch (err) {
			console.error("Erreur lors du fetch des articles :", err);
		}
	};

	useEffect(() => {
		fetchArticles().catch(console.error);
	}, []);

	// ferme la modale popup + recharge les articles
	const handleArticleCreated = () => {
		setShowForm(false);
		fetchArticles().catch(console.error);
	};

	return (
		<main className="blog-page">
			{/* cartes d'articles */}
			{articles.map((article) => (
				<BlogCard key={article.id} article={article} />
			))}

			{/* bouton en bas (admin uniquement) */}
			{isAdmin && (
				<>
					<button className="add-article-btn" onClick={() => setShowForm(true)}>
						Ajouter un article
					</button>

					{showForm && (
						<div className="modal-overlay" onClick={() => setShowForm(false)}>
							<div
								className="modal-content"
								onClick={(e) => e.stopPropagation()}
							>
								<BlogCreateForm onSuccess={handleArticleCreated} />

								<button
									className="modal-close-btn"
									onClick={() => setShowForm(false)}
								>
									X
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</main>
	);
};

export default BlogPage;
