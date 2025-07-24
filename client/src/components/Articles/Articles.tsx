import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import "./Articles.css";

type Article = {
  id: number;
  title: string;
  content: string;
  category_id: number;
  created_at: string;
};

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`,
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data: Article[] = await response.json();
      setArticles(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des articles:", err);
      setError(
        "Impossible de charger les articles. Veuillez réessayer plus tard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDeleteArticle = async (articleId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${articleId}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Erreur lors de la suppression de l'article:",
            errorText,
          );
          throw new Error(`Échec de la suppression: ${response.status}`);
        }

        fetchArticles();
      } catch (err) {
        console.error("Erreur de suppression:", err);
        alert(`Erreur lors de la suppression de l'article`);
      }
    }
  };

  if (loading) {
    return (
      <div className="articles-container">
        <h1 className="articles-title">Chargement des Articles...</h1>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-container">
        <h1 className="articles-title">Erreur</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="articles-container">
      <h1 className="articles-title">Nos Derniers Articles</h1>
      <NavLink to="/add-article" className="add-article-button">
        Ajouter un article
      </NavLink>

      {articles.length === 0 ? (
        <p className="no-articles-message">
          Aucun article n'est disponible pour le moment.
        </p>
      ) : (
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.id} className="article-card-wrapper">
              {" "}
              <NavLink
                to={`/articles/${article.id}`}
                className="article-card-link"
              >
                <div className="article-card-content-area">
                  {" "}
                  <h2 className="article-card-title">{article.title}</h2>
                  <p className="article-card-content">{article.content}</p>
                  <p className="article-card-meta">
                    Publié le:{" "}
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                </div>
              </NavLink>
              <button
                type="button"
                className="delete-article-button"
                onClick={() => handleDeleteArticle(article.id)}
              >
                Supprimer
              </button>
              <NavLink
                to={`/edit-article/${article.id}`}
                className="edit-article-button"
              >
                Modifier un article
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;
