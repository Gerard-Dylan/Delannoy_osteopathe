import axios from "axios";
import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await axios.post(
				"http://localhost:3000/api/connexion-delannoy-osteo",
				{ email, password },
				{ withCredentials: true },
			);
			toast.success("Connexion réussie !");
			window.location.href = "/blog";
		} catch (err) {
			console.error(err);
			toast.error("Échec de la connexion.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<h2>Connexion admin</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Se connecter</button>
		</form>
	);
};

export default LoginPage;
