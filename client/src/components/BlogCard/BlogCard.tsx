import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import "./BlogCard.css";

interface BlogCardProps {
	article: {
		id: number;
		title: string;
		content: string;
		createdAt: string;
		image: string | null;
		alt: string;
	};
}

function BlogCard({ article }: BlogCardProps) {
	const { isAdmin } = useContext(LoginContext);
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => setExpanded(!expanded);

	return (
		<article className="blog-card" aria-labelledby={`blog-title-${article.id}`}>
			{article.image && (
				<img
					src={`http://localhost:3000${article.image}`}
					alt={article.alt}
					className="blog-card-image"
				/>
			)}

			<div className="blog-card-content">
				<h3 id={`blog-title-${article.id}`} className="blog-card-title">
					{article.title}
				</h3>

				<p
					className={`blog-card-content-text ${expanded ? "expanded" : "truncated"}`}
				>
					{article.content}
				</p>

				{article.content.length > 350 && (
					<button className="see-more" onClick={toggleExpanded}>
						{expanded ? "Voir moins" : "Voir plus"}
					</button>
				)}

				<p className="blog-card-date">
					{new Date(article.createdAt).toLocaleDateString("fr-FR")}
				</p>
			</div>

			{isAdmin && (
				<div className="admin-actions">
					<button>Modifier</button>
					<button>Supprimer</button>
				</div>
			)}
		</article>
	);
}

export default BlogCard;
