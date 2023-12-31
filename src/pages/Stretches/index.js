import axios from 'axios';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';

import {
  bool,
} from 'prop-types';

// Components
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Card';

// Styles
import './styles.scss';

export default class Stretches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stretches: [],
      categories: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/stretches`)
      .then((response) => {
        const stretches = response.data;
        this.setState({ stretches });
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/categories`)
      .then((response) => {
        const categories = response.data;
        this.setState({ categories });
      });
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  filterData = () => {
    const { searchTerm, stretches } = this.state;
    return stretches.filter((rawdata) => rawdata.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  render() {
    const { isAdmin, isLogged } = this.props;
    const { searchTerm, categories } = this.state;
    const filterData = this.filterData();

    return (
      <div className="stretches">
        <div>
          <Wrapper
            wrapperTitle="Voici tous nos étirements disponibles"
            wrapperDescription="Lors d'un étirement, n'allez pas au-delà de vos limites physiologiques. L'étirement doit être fait en douceur et doit uniquement mettre en tension le muscle correspondant."
          />
          <input
            type="search"
            name="search"
            id="searchInput"
            placeholder="Ecrivez le nom de votre étirement..."
            value={searchTerm}
            onChange={this.handleSearch}
          />
        </div>
        <p className="stretches-p">Vous pouvez choisir un étirement directement dans la barre de recherche, ou vous pouvez simplement naviguer dans la liste ci-dessous</p>
        {isAdmin ? (
          <div className="stretches-add">
            <NavLink to="/new-stretch" className="stretches-add-stretch-btn"> <AiFillPlusCircle /> Ajouter un étirement </NavLink>
          </div>
        ) : null}

        <main>
          <div className="stretches-container">
            <ul>
              {categories.map((category) => (
                <div className="stretches-container-category" key={category.name}>
                  <div id={category.name} />
                  <h2 className="stretches-container-h2">{category.name}</h2>
                  <ul className="stretches-container-ul">
                    {filterData
                      .filter((stretch) => stretch.categorie_id === category.id)
                      .map((stretch) => (
                        <Card
                          id={stretch.id}
                          title={stretch.title}
                          description={stretch.description}
                          img={stretch.main_image}
                          alt={stretch.title}
                          hover={stretch.title}
                          key={stretch.id}
                          link={stretch.id}
                          isLogged={isLogged}
                        />
                      ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

Stretches.propTypes = {
  // eslint-disable-next-line react/require-default-props
  isAdmin: bool,
  isLogged: bool.isRequired,
};
