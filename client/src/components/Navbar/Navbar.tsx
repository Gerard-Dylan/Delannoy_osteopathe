import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-osteo.png";
import { LoginContext } from "../../contexts/LoginContext";
import "./Navbar.css";

function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isAdmin, logout } = useContext(LoginContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

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

			<nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
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
