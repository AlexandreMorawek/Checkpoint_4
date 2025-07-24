import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Page404.css";
import Lost from "../../assets/images/image_404.jpg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page non trouvée</h1>
      <p className="notfound-text">
        Redirection vers l’accueil dans quelques secondes...
      </p>
      <div className="spinner" />
      <img src={Lost} alt="Angry lost person" className="image_404" />
    </div>
  );
};

export default NotFoundPage;
