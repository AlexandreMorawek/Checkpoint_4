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
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/articles">Articles</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
