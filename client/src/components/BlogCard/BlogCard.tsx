import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

function BlogCard() {
    const { isAdmin } = useContext(LoginContext);

    return (
        <div className="blog-card">
            <h3>Titre de l'article</h3>
            <p>Descriptif</p>

            {isAdmin && (
                <div className="admin-actions">
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>
            )}
        </div>
    );
}

export default BlogCard;
