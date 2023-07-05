import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.scss'


const NewStretch = () => {

    const navigate = useNavigate();
    const [errorInput, setErrorInput] = useState(false)
    const [userValue, setUserValue] = useState({
        title: "",
        description_content: "",
        main_image: "",
        category_id:""
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userValue)
        const token = localStorage.getItem('token');
        if (userValue.title === '' || userValue.description_content === '') {
          setErrorInput(true)
          } else {
        axios.post(`${process.env.REACT_APP_BASE_URL}/stretches`, userValue, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
       
          console.log(response.data);
          setErrorInput(true)
          navigate("/stretches");
        })
        .catch((error) => {
          console.log(error);
        });
      
      }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
      setUserValue({
          ...userValue,
          [name]: value
        })
    }
    return (
        <form className="new-stretch-container" onSubmit={handleSubmit}>
            <h2>Ajouter un étirement</h2>
      {
          errorInput ? <div className='error'> Tous les champs sont obligatoires </div> : null
      }
     <p>
          Nom de l'étirement:
      </p>
        <input type="text" name="title" value={userValue.title} className='infos' placeholder="Etirement" onChange={handleChange}/> 

        <p>
          URL de la photo:
      </p>
        <input type="text" name="main_image" value={userValue.main_image} className='infos' placeholder="https://" onChange={handleChange}/> 
      
        <p>
          Description:
        </p>
        <textarea rows="5" cols="33" type="text" name="description_content" value={userValue.description_content} className='infos'  placeholder="Pour étirer ce muscle..." onChange={handleChange}/>

        <p>Catégorie:</p>

        <select name="category_id" className="custom-select" onChange={handleChange} value={userValue.category_id}>
            <option value="">--Merci de sélectionner une catégorie--</option>
            <option value="1">Cou</option>
            <option value="2">Bras</option>
            <option value="3">Avant-bras</option>
            <option value="4">Poitrine</option>
            <option value="5">Ventre</option>
            <option value="6">Dos</option>
            <option value="7">Hanche</option>
            <option value="8">Fessiers</option>
            <option value="9">Cuisse</option>
            <option value="10">Jambe</option>
            <option value="11">Pied</option>
        </select>

        <button className="save-btn" >Enregistrer</button>
    </form> 
    )
}

export default NewStretch;
