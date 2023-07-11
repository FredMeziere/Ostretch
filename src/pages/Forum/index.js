import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

// Styles
import './styles.scss';

function Forum() {
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

export default Forum;
