import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchArticles = async () => {
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
    };

    fetchArticles();
  }, []);

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
      {articles.length === 0 ? (
        <p className="no-articles-message">
          Aucun article n'est disponible pour le moment.
        </p>
      ) : (
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <h2 className="article-card-title">{article.title}</h2>
              <p className="article-card-content">{article.content}</p>
              <p className="article-card-meta">
                Publié le: {new Date(article.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;
