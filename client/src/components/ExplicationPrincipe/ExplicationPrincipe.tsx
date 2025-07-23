import Workspace from "../../assets/images/Workspace.jpg";
import "./ExplicationPrincipe.css";

function ExplicationPrincipe() {
  return (
    <section className="presentation-section principle-explanation">
      <div className="text-content">
        <h2 className="section-title">Comment ça Marche ?</h2>
        <p className="section-text">
          Notre plateforme est conçue pour l'échange. Rédigez et publiez vos
          propres articles, partageant analyses et coups de cœur. Parcourez une
          vaste collection d'articles de la communauté, filtrés par genre.
          Chaque article offre un espace de commentaires pour interagir et
          débattre. Un écosystème où la passion musicale s'exprime librement,
          encourageant l'apprentissage mutuel.
        </p>
      </div>
      <div className="image-content">
        <img
          src={Workspace}
          alt="People in workspace"
          className="section-image"
        />
      </div>
    </section>
  );
}

export default ExplicationPrincipe;
