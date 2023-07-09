import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// Images
import fred from '../../assets/img/fred.JPG';
import candice from '../../assets/img/candice.jpeg'
import marie from '../../assets/img/marie.JPG'
import ludo from '../../assets/img/ludo.jpg'

const About = () => {
  return (
    <div className='About'>
        <h2>L'équipe O'Stretch</h2>
            <div className='about-container'>
                <div className='about-card'>
                    <img className='about-photo' src={marie} alt="" />
                    <div>
                        <p className='about-name'>Marie Geneste</p>
                        <p>Product Owner et Développeuse Backend</p>
                        <div className='about-icons'>
                            <Link to="https://www.linkedin.com/in/marie-geneste-b254a4251/">
                                <FaLinkedin />
                            </Link>
                            <Link to="https://github.com/Marie-Geneste">
                                <FaGithub />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='about-card'>
                    <img className='about-photo' src={fred} alt="" />
                    <div>
                        <p className='about-name'>Fred Meziere</p>
                        <p>Git Master et Développeur Backend</p>
                        <div className='about-icons'>
                            <Link to="https://www.linkedin.com/in/fred-meziere/">
                                <FaLinkedin />
                            </Link>
                            <Link to="https://github.com/FredMeziere">
                                <FaGithub />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='about-card'>
                    <img className='about-photo' src={candice} alt="" />
                    <div>
                        <p className='about-name'>Candice Boutet</p>
                        <p>Scrum Master et Développeuse Frontend</p>
                        <div className='about-icons'>
                            <Link to="https://www.linkedin.com/in/candice-boutet/">
                                <FaLinkedin />
                            </Link>
                            <Link to="https://github.com/candiceboutet">
                                <FaGithub />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='about-card'>
                <img className='about-photo' src="" alt="" />
                    <div>
                        <p className='about-name'>Andy Vasseur</p>
                        <p>Référent technique et Développeur Frontend</p>
                        <div className='about-icons'>
                            <Link to="https://www.linkedin.com/in/andy-vasseur/">
                                <FaLinkedin />
                            </Link>
                            <Link to="https://github.com/Andy-Vasseur">
                                <FaGithub />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='about-card'>
                    <img className='about-photo' src={ludo} alt="" />
                    <div>
                        <p className='about-name'>Ludovic Torval</p>
                        <p>Lead Dev et Développeur Frontend</p>
                        <div className='about-icons'>
                            <Link to="https://www.linkedin.com/in/ludovict/">
                                <FaLinkedin />
                            </Link>
                            <Link to="https://github.com/Lubolivia">
                                <FaGithub />
                            </Link>
                        </div>
                    </div>
                </div>

    </div>
    </div>
  );
}

export default About;
