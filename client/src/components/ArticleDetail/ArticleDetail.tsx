import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./ArticleDetail.css";

type Article = {
  id: number;
  title: string;
  content: string;
  category_id: number;
  created_at: string;
};

function ArticleDetails() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/article/${id}`,
        );
        if (!response.ok) throw new Error("Article introuvable");
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError("Impossible de charger l'article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Aucun article trouvé.</p>;

  return (
    <>
      <div className="article-details">
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <p>Publié le : {new Date(article.created_at).toLocaleDateString()}</p>
      </div>
      <NavLink to="/articles" className="article-button">
        ← Retour aux articles
      </NavLink>
    </>
  );
}

export default ArticleDetails;
