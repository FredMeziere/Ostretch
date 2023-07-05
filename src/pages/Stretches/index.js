import axios from 'axios';
import { Component } from 'react';
import { NavLink } from "react-router-dom";

// Components
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Card';

// Styles
import './styles.scss';
import { AiFillPlusCircle } from 'react-icons/ai';

export default class Stretches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stretches: [],
      categories: [],
      searchTerm: ''
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/stretches`)
      .then(response => {
        let stretches = response.data;
        this.setState({ stretches })
      })

    axios.get(`${process.env.REACT_APP_BASE_URL}/categories`)
      .then(response => {
        let categories = response.data;
        this.setState({ categories })
      })
  }


  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  filterData = () => {
    const { searchTerm } = this.state
    return this.state.stretches.filter((rawdata) => {
      return rawdata.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  render() {
    const filterData = this.filterData();
    console.log(this.filterData())
    return (
      <div className='Stretches'>
        <div>
          <Wrapper
            wrapperTitle='Tous nos étirements disponibles'
            wrapperDescription="Lors d'un étirement, n'allez pas au delà de vos limites physiologiques. L'étirement doit être fait en douceur et doit uniquement mettre en tension le muscle correspondant."
          />
          <input
            type="search"
            name="search"
            id="searchInput"
            placeholder='Votre recherche...'
            value={this.state.searchTerm}
            onChange={this.handleSearch}
          />
        </div>
        {this.props.isAdmin ? (
                  <div className='add-container'>
                  <NavLink to="/new-stretch" className="add-stretch-btn"> <AiFillPlusCircle /> Ajouter un étirement </NavLink>
                  </div>
        ) : null}

        <main>
          
          <div className='stretches-container'>
              <ul>
                {
                  this.state.categories.map((category) => (
                    <div className='category' key={category.name}>
                      <div id={category.name} />
                      <h2>{category.name}</h2>
                      <ul>
                        {
                          filterData
                            .filter(stretch => stretch.categorie_id === category.id)
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
                                isLogged={this.props.isLogged}
                              />
                            ))
                        }
                      </ul>
                    </div>
                  ))
                }
  
              </ul>
          </div>
        </main>
      </div>
    )
  }
}
