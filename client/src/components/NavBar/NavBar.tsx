import { NavLink } from "react-router-dom";
import "./navBar.css";
import logo from "../../assets/images/logo.png";

function NavBar() {
  return (
    <header className="navBar">
      <div className="navTop">
        <img src={logo} className="logo" alt="Logo gauche" />
        <h1 className="siteName">Music Start</h1>
        <img src={logo} className="logo" alt="Logo droite" />
      </div>
      <nav>
        <ul className="navLinks">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/articles"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              S'inscrire
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Se connecter
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
