import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
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

	useEffect(() => {
		(async () => {
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
		})();
	}, []);

	return (
		<main className="blog-page">
			{articles.map((article) => (
				<BlogCard key={article.id} article={article} />
			))}
		</main>
	);
};

export default BlogPage;
