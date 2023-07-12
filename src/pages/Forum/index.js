import axios from 'axios';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

// Styles
import './styles.scss';


    return (
      <div className="forum">
        <div className="forum-container">
          <Wrapper
            wrapperTitle="Bienvenue sur le forum"
            wrapperDescription="Vous pourrez retrouver ici de nombreux sujets de discussions passionnants"
          />
          <div className="forum-container-info">
            <h2 className="forum-container-p">Les discussions récentes</h2>
          </div>
          <div className="forum-container-info">
            <h2 className="forum-container-p">Les différents sujets</h2>
          </div>
        </div>
      </div>
    );
  }
}
