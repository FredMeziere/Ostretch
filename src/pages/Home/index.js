import { Link } from 'react-router-dom';

// Components
import Wrapper from '../../components/Wrapper';
import HumanBody from '../../components/HumanBody/HumanBody';

// Styles
import './home.scss';

function Home() {
  return (
    <>
      <header>
        <div className="home">
          <Wrapper
            wrapperTitle="Une nouvelle approche des étirements"
            wrapperDescription="Lors d'un étirement, n'allez pas au delà de vos limites physiologiques. L'étirement doit être fait en douceur et doit uniquement mettre en tension le muscle correspondant."
          />
          <Link className="home-discover-button" to="/stretches">
            Découvrir
          </Link>
          <p className="home-p">Cliquez sur le bouton pour accéder aux étirements.</p>
          <p className="home-p1">Vous pouvez également cliquez sur le corps humain pour choisir un étirement.</p>
        </div>
      </header>

      <main>
        <HumanBody className="HumanBody" />
      </main>
    </>
  );
}

export default Home;
