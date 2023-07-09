import React from 'react';
import './styles.scss';

const Error404 = () => {
  return (
    <div className='ErrorPage'>
      <div style={{ textAlign: "center" }}>
        <h1>Erreur 404: Page non trouvée</h1>
        <p>Désolé, la page que vous recherchez est introuvable.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={`${process.env.PUBLIC_URL}/femme yoga error 404.jpg`} alt="Erreur 404" width= '700' />
      </div>
    </div>
  );
}

export default Error404;