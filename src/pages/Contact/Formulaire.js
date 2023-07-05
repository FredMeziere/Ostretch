// Styles
import axios from 'axios';
import './formulaire.scss';
import { useState, useRef } from 'react';

function Formulaire() {
  const contactFormRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      subject,
      message,
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/contact`, formData)
      .then((response) => response.data)
      .then((data) => {
        if (data === 'success') {
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        }
        else {
          const errorMessage = 'Une erreur s\'est produite lors de l\'envoi du formulaire de contact.';
          // eslint-disable-next-line no-alert
          alert(errorMessage);
        }
      });
  };

  return (
    <form ref={contactFormRef} className="form" onSubmit={handleSubmit}>
      <p className="form-p">Si vous souhaitez nous contacter remplissez le formulaire de contact ci-dessous, et nous répondrons au plus vite</p>
      <div className="form-div">
        <label className="form-label" htmlFor="name">Votre nom</label>
        <input className="form-input" type="text" id="name" placeholder="Votre nom / prénom ici" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="form-div">
        <label className="form-label" htmlFor="email">Votre e-mail</label>
        <input className="form-input" type="email" id="email" placeholder="Votre adresse email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="form-div">
        <label className="form-label" htmlFor="subject">Motif de votre contact</label>
        <input className="form-input" type="text" id="subject" placeholder="Sujet de votre message" value={subject} onChange={(event) => setSubject(event.target.value)} />
      </div>
      <div className="form-div">
        <label className="form-label" htmlFor="message">Votre message</label>
        <textarea className="form-textarea" id="message" placeholder="Votre message" value={message} onChange={(event) => setMessage(event.target.value)} />
      </div>
      <div className="form-div">
        <button className="form-button" type="submit">Envoyer mon message</button>
      </div>
    </form>
  );
}

export default Formulaire;
