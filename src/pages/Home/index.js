import React from 'react';
import { Link } from 'react-router-dom'

// Components
import Wrapper from '../../components/Wrapper';
import HumanBody from '../../components/HumanBody/HumanBody';

// Styles
import './home.scss';

const Home = () => {
    return (
        <>
            <header>
                <div className='Home'>
                    <Wrapper
                        wrapperTitle="Une nouvelle approche des étirements"
                        wrapperDescription="Lors d'un étirement, n'allez pas au delà de vos limites physiologiques. L'étirement doit être fait en douceur et doit uniquement mettre en tension le muscle correspondant."
                    />
                    <Link className='discover-button' to="/stretches">
                        Découvrir
                    </Link>
                </div>
            </header>

            <main>
                <HumanBody className="HumanBody" />
            </main>
        </>
    );
};

export default Home;