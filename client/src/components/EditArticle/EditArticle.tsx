import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../pages/AddArticlePage/AddArticlePage.css";

type Article = {
  id: number;
  title: string;
  content: string;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
};

function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        );
        if (!response.ok)
          throw new Error("Erreur lors du chargement de l'article.");
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError("Impossible de récupérer l'article.");
      }
    };

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`,
        );
        if (!response.ok)
          throw new Error("Erreur de récupération des catégories.");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Impossible de charger les catégories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchArticle();
    fetchCategories();
    setLoading(false);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!article) return;
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: name === "category_id" ? Number.parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(article),
          credentials: "include",
        },
      );
      if (!response.ok) throw new Error("Échec de la mise à jour.");
      setMessage("Article modifié avec succès !");
      setTimeout(() => {
        navigate("/articles");
      }, 3000);
    } catch (err) {
      setError("Erreur lors de la modification.");
    }
  };

  if (loading || !article) return <p>Chargement...</p>;
  if (error) return <p className="form-message error">{error}</p>;

  return (
    <div className="add-article-page-container">
      <h1 className="add-article-page-title">Modifier l'article</h1>
      <form onSubmit={handleSubmit} className="add-article-form">
        <div className="form-group">
          <label htmlFor="title">Titre:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenu:</label>
          <textarea
            id="content"
            name="content"
            value={article.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Catégorie:</label>
          {loadingCategories ? (
            <p className="loading-message">Chargement des catégories...</p>
          ) : (
            <select
              id="category_id"
              name="category_id"
              value={article.category_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner une catégorie --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {message && <p className="form-message success">{message}</p>}
        <button type="submit" className="submit-button">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}

export default EditArticle;
