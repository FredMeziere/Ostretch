import { Link } from 'react-router-dom';

// Styles
import './styles.scss';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// Images
import fred from '../../assets/img/fred.JPG';
import candice from '../../assets/img/candice.jpeg';
import marie from '../../assets/img/marie.JPG';
import ludo from '../../assets/img/ludo.jpg';
import andy from '../../assets/img/andy.jpg';

function About() {
  return (
    <div className="about">
      <h2 className="about-h2">L'équipe O'Stretch</h2>
      <div className="about-container">
        <div className="about-container-card">
          <img className="about-container-photo" src={marie} alt="" />
          <div className="about-container-div">
            <p className="about-container-name">Marie Geneste</p>
            <p className="about-container-role">Product Owner et Développeuse Backend</p>
            <div className="about-container-icons">
              <Link to="https://www.linkedin.com/in/marie-geneste-b254a4251/">
                <FaLinkedin />
              </Link>
              <Link to="https://github.com/Marie-Geneste">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className="about-container-card">
          <img className="about-container-photo" src={fred} alt="" />
          <div className="about-container-div">
            <p className="about-container-name">Fred Meziere</p>
            <p className="about-container-role">Git Master et Développeur Backend</p>
            <div className="about-container-icons">
              <Link to="https://www.linkedin.com/in/fred-meziere/">
                <FaLinkedin />
              </Link>
              <Link to="https://github.com/FredMeziere">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className="about-container-card">
          <img className="about-container-photo" src={candice} alt="" />
          <div className="about-container-div">
            <p className="about-container-name">Candice Boutet</p>
            <p className="about-container-role">Scrum Master et Développeuse Frontend</p>
            <div className="about-container-icons">
              <Link to="https://www.linkedin.com/in/candice-boutet/">
                <FaLinkedin />
              </Link>
              <Link to="https://github.com/candiceboutet">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className="about-container-card">
          <img className="about-container-photo" src={andy} alt="" />
          <div className="about-container-div">
            <p className="about-container-name">Andy Vasseur</p>
            <p className="about-container-role">Référent technique et Développeur Frontend</p>
            <div className="about-container-icons">
              <Link to="https://www.linkedin.com/in/andy-vasseur/">
                <FaLinkedin />
              </Link>
              <Link to="https://github.com/Andy-Vasseur">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className="about-container-card">
          <img className="about-container-photo" src={ludo} alt="" />
          <div className="about-container-div">
            <p className="about-container-name">Ludovic Torval</p>
            <p className="about-container-role">Lead Dev et Développeur Frontend</p>
            <div className="about-container-icons">
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
