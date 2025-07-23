import Concert from "../../assets/images/Concert.jpeg";
import "./Avantages.css";

function Avantages() {
  return (
    <section className="presentation-section advantages-site reverse-layout">
      <div className="text-content">
        <h2 className="section-title">Pourquoi Nous Rejoindre ?</h2>
        <p className="section-text">
          Rejoignez notre blog pour une source inépuisable d'inspiration
          musicale. Publiez vos contenus facilement, augmentant votre
          visibilité. Interagissez avec d'autres passionnés, échangez des idées
          et découvrez de nouveaux horizons. Notre site est optimisé pour une
          expérience fluide sur tous les appareils. C'est l'endroit idéal pour
          approfondir votre culture musicale et partager votre amour du son.
        </p>
      </div>
      <div className="image-content">
        <img
          src={Concert}
          alt="Communauté musicale"
          className="section-image"
        />
      </div>
    </section>
  );
}

export default Avantages;
