import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setMessage(null);
    setIsError(false);

    try {
      const success = await authLogin(data.email, data.password);

      if (success) {
        setMessage("Connexion réussie !");
        setIsError(false);
        reset();

        setTimeout(() => {
          navigate("/articles");
        }, 1500);
      } else {
        setMessage("Email ou mot de passe incorrect.");
        setIsError(true);
      }
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      const errorMessage = `Erreur: ${(err as Error).message || "Impossible de se connecter."}`;
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="login-page-container">
      <h1 className="login-page-title">Se connecter</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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

        {message && (
          <p className={`form-message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}

        <button type="submit" className="submit-button">
          Se connecter
        </button>
      </form>
      <p className="register-link-paragraph">
        Vous n'avez pas encore de compte ?{" "}
        <NavLink to="/register" className="register-link">
          Inscrivez-vous !
        </NavLink>
      </p>
    </div>
  );
};

export default LoginPage;
