import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { LoginContext } from "../../contexts/LoginContext";
import BlogCreateForm from "./BlogCreateForm";
import BlogEditForm from "./BlogEditForm";
import "./BlogPage.css";

export interface BlogArticle {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	image: string | null;
	alt: string;
}

const BlogPage = () => {
	const [articles, setArticles] = useState<BlogArticle[]>([]);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(
		null,
	);
	const { isAdmin } = useContext(LoginContext);

	// Récupération des articles
	const fetchArticles = async () => {
		try {
			const res = await axios.get<BlogArticle[]>(
				"http://localhost:3000/api/blogs",
				{
					withCredentials: true,
				},
			);
			setArticles(res.data);
		} catch (err) {
			console.error("Erreur lors du fetch des articles :", err);
		}
	};

	useEffect(() => {
		fetchArticles().catch(console.error);
	}, []);

	const handleArticleCreated = () => {
		setShowCreateForm(false);
		fetchArticles().catch(console.error);
	};

	const handleArticleUpdated = () => {
		setShowEditForm(false);
		setSelectedArticle(null);
		fetchArticles().catch(console.error);
	};

	const handleEditClick = (article: BlogArticle) => {
		setSelectedArticle(article);
		setShowEditForm(true);
	};

	return (
		<main className="blog-page">
			{articles.map((article) => (
				<BlogCard
					key={article.id}
					article={article}
					onEdit={() => handleEditClick(article)}
				/>
			))}

			{isAdmin && (
				<>
					<button
						className="add-article-btn"
						onClick={() => setShowCreateForm(true)}
					>
						Ajouter un article
					</button>

					{/* Formulaire de création */}
					{showCreateForm && (
						<div
							className="modal-overlay"
							onClick={(e) => {
								if (e.target === e.currentTarget) setShowCreateForm(false);
							}}
						>
							<div
								className="modal-content"
								onClick={(e) => e.stopPropagation()}
							>
								<BlogCreateForm onSuccess={handleArticleCreated} />
								<button
									className="modal-close-btn"
									onClick={() => setShowCreateForm(false)}
								>
									X
								</button>
							</div>
						</div>
					)}

					{/* Formulaire de modification */}
					{showEditForm && selectedArticle && (
						<div
							className="modal-overlay"
							onClick={(e) => {
								if (e.target === e.currentTarget) setShowEditForm(false);
							}}
						>
							<div
								className="modal-content"
								onClick={(e) => e.stopPropagation()}
							>
								<BlogEditForm
									article={selectedArticle}
									onSuccess={handleArticleUpdated}
									onCancel={() => setShowEditForm(false)}
								/>
								<button
									className="modal-close-btn"
									onClick={() => setShowEditForm(false)}
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
