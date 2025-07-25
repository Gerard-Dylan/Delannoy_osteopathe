// src/components/Navbar/Navbar.tsx

import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-osteo.png";
import { LoginContext } from "../../contexts/LoginContext";
import "./Navbar.css";

function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isAdmin, logout } = useContext(LoginContext);
	const navigate = useNavigate();
	const menuRef = useRef<HTMLDivElement>(null); // 🔁 Référence pour clic en dehors

	// Déconnexion admin
	const handleLogout = () => {
		logout();
		navigate("/blog");
	};

	// Ferme le menu si clic en dehors
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuOpen &&
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);

	return (
		<header className="navbar">
			<div className="navbar-logo">
				<Link to="/">
					<img src={logo} alt="Logo du site Ostéopathe" />
				</Link>
			</div>

			<button
				className="navbar-toggle"
				aria-label="Ouvrir le menu"
				aria-expanded={menuOpen}
				onClick={() => setMenuOpen(!menuOpen)}
			>
				☰
			</button>

			<nav className={`navbar-menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
				<ul>
					<li>
						<Link to="/">Accueil</Link>
					</li>
					<li>
						<Link to="/blog">Blog</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>
					{isAdmin && (
						<>
							<li className="inactive-link">Tableau de bord</li>
							<li>
								<button onClick={handleLogout} className="logout-btn">
									Déconnexion
								</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Navbar;
