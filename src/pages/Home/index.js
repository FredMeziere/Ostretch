import { Link } from 'react-router-dom';

// Components
import Wrapper from '../../components/Wrapper';
import HumanBody from '../../components/HumanBody/HumanBody';

// Styles
import './home.scss';

function Home() {
  return (
    <>
      <header className="home">
        <div className="home-div-wrapper">
          <Wrapper
            wrapperTitle="Une nouvelle approche des étirements avec O'stretch"
            wrapperDescription="Lors d'un étirement, n'allez pas au delà de vos limites physiologiques. L'étirement doit être fait en douceur et doit uniquement mettre en tension le muscle correspondant."
          />
          <Link className="home-discover-button" to="/stretches">
            Découvrir
          </Link>
        </div>
      </header>

      <main className="home-div-wrapper">
        <HumanBody className="HumanBody" />
      </main>
    </>
  );
}

export default Home;
