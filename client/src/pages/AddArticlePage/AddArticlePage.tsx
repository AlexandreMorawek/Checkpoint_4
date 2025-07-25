import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import "./AddArticlePage.css";

type ArticleFormData = {
  title: string;
  content: string;
  categories_id: number;
};

type Category = {
  id: number;
  name: string;
};

const AddArticlePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArticleFormData>();

  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`,
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des catégories:", err);
        setCategoriesError("Impossible de charger les catégories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    setMessage(null);
    setIsError(false);

    const newArticle = {
      title: data.title,
      content: data.content,
      categories_id: data.categories_id,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newArticle),
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      setMessage(result.message || "Article ajouté avec succès !");
      setIsError(false);
      reset();

      setTimeout(() => {
        navigate("/articles");
      }, 3000);
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'article:", err);
      const errorMessage = `Erreur: ${(err as Error).message || "Impossible d'ajouter l'article."}`;
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="add-article-page-container">
      <h1 className="add-article-page-title">Ajouter un nouvel article</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="add-article-form">
        <div className="form-group">
          <label htmlFor="title">Titre:</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Le titre est requis." })}
          />
          {errors.title && <p className="error-text">{errors.title.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenu:</label>
          <textarea
            id="content"
            {...register("content", { required: "Le contenu est requis." })}
          />
          {errors.content && (
            <p className="error-text">{errors.content.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category_id">Catégorie:</label>
          {loadingCategories ? (
            <p className="loading-message">Chargement des catégories...</p>
          ) : categoriesError ? (
            <p className="error-text">{categoriesError}</p>
          ) : (
            <select
              id="category_id"
              {...register("categories_id", {
                required: "Veuillez sélectionner une catégorie.",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Veuillez sélectionner une catégorie valide.",
                },
              })}
            >
              <option value="">-- Sélectionner une catégorie --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          {errors.categories_id && (
            <p className="error-text">{errors.categories_id.message}</p>
          )}
        </div>
        {message && (
          <p className={`form-message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
        <button type="submit" className="submit-button">
          Ajouter l'article
        </button>
      </form>
    </div>
  );
};

export default AddArticlePage;
