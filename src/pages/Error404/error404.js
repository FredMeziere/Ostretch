import './styles.scss';

function Error404() {
  return (
    <div className="errorpage">
      <div className="errorpage-div">
        <h1 className="errorpage-h1">Erreur 404: Page non trouvée</h1>
        <p className="errorpage-p">Désolé, mais malheuresement la page que vous recherchez est introuvable.</p>
      </div>
      <div className="errorpage-div">
        <img className="errorpage-img" src={`${process.env.PUBLIC_URL}/femme_yoga_error_404.jpg`} alt="Erreur 404" width="700" />
      </div>
    </div>
  );
}

export default Error404;
