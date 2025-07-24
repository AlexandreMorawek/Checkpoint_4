import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.css";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();
  const password = watch("password");

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setMessage(null);
    setIsError(false);

    const { confirmPassword, ...registerData } = data;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        },
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      setMessage(result.message || "Inscription réussie !");
      setIsError(false);
      reset();

      setTimeout(() => {
        navigate("/articles");
      }, 3000);
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      const errorMessage = `Erreur: ${(err as Error).message || "Impossible de s'inscrire."}`;
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="register-page-container">
      <h1 className="register-page-title">S'inscrire</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Le nom d'utilisateur est requis.",
              minLength: { value: 3, message: "Minimum 3 caractères." },
            })}
          />
          {errors.username && (
            <p className="error-text">{errors.username.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "L'email est requis.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Format d'email invalide.",
              },
            })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Le mot de passe est requis.",
              minLength: { value: 6, message: "Minimum 6 caractères." },
            })}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Veuillez confirmer votre mot de passe.",
              validate: (value) =>
                value === password || "Les mots de passe ne correspondent pas.",
            })}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>

        {message && (
          <p className={`form-message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}

        <button type="submit" className="submit-button">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
