import { useState } from 'react';
import Bookmarks from '../../components/Bookmarks';

// Styles
import Info from '../../components/Info';
import InfoForm from '../../components/InfoForm';
import './styles.scss'

const MySpace = ({user, setUser, setIsLogged}) => {

    const [isEditOpen, setIsEditOpen] = useState(false);

    const onEdit = () => {
        setIsEditOpen(!isEditOpen);
    }

    return (
        <div className='MySpace'>
            <h1>Bienvenue {user.username}</h1>
            <div className="box">
                
                <h2>Mes informations</h2>
                { isEditOpen ? <InfoForm user={user} setIsEditOpen={setIsEditOpen} setUser={setUser} setIsLogged={setIsLogged} /> : <Info user={user} handleClick={onEdit} />}
     
            </div>
            <div className="box">
                <h2>Mes favoris</h2>
                <Bookmarks />          
            </div>
        </div>
    );
};

export default MySpace;

// /user/me/stretches/:id