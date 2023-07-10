import './styles.scss';

function Error404() {
  return (
    <div className="errorpage">
      <div className="errorpage-content">
        <h1 className="errorpage-content-h1">Erreur 404: Page non trouvée</h1>
        <p className="errorpage-content-p">Désolé, la page que vous recherchez est introuvable.</p>
      </div>
      <div>
        <img src="../femme_yoga_error_404.png" alt="Erreur 404" />
      </div>
    </div>
  );
}

export default Error404;
