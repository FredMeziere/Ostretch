import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

// Styles
import './styles.scss';

function Forum() {
  return (
    <div className="forum">
      <Wrapper
        wrapperTitle="Bienvenue sur le forum"
        wrapperDescription="Vous pourrez retrouver ici de nombreux sujets de discussions passionnants"
      />
      <div className="forum-container">
        <div className="forum-container-subject">
          <h2 className="forum-container-subject-h2">Les différentes catégories de sujets</h2>
        </div>
        <div className="forum-container-discussions">
          <h2 className="forum-container-discussions-h2">Les discussions récentes</h2>
        </div>

      </div>
    </div>
  );
}

export default Forum;
