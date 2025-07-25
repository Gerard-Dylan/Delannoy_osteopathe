import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Error404.css";
import errorImage from "../../assets/images/404error.png";

function Error404() {
	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate("/blog");
		}, 2000);
		return () => clearTimeout(timeout);
	}, [navigate]);

	return (
		<section className="error-404" aria-labelledby="error-title">
			<img
				src={errorImage}
				alt="Erreur 404 - page introuvable"
				className="error-404-image"
			/>
			<h1 id="error-title" className="error-404-title">
				Page introuvable
			</h1>
			<p className="error-404-message">Redirection vers l’accueil...</p>
		</section>
	);
}

export default Error404;
