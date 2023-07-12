import axios from 'axios';
import { Component } from 'react';
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Card';
// Styles
import './styles.scss';

export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stretches: [],
      categories: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
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
    const { searchTerm, categories } = this.state;
    const filterData = this.filterData();

    return (
      <div className="forum">
        <Wrapper
          wrapperTitle="Bienvenue sur le forum"
          wrapperDescription="Vous pourrez retrouver ici de nombreux sujets de discussions passionnants"
        />
        <div className="forum-container">
          <div className="forum-container-subject">
            <h2 className="forum-container-subject-h2">Les différentes catégories de sujets</h2>
            <ul>
              <input
                type="search"
                name="search"
                id="searchInput"
                placeholder="Ecrivez le nom de votre étirement..."
                value={searchTerm}
                onChange={this.handleSearch}
              />
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
                        />
                      ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
          <div className="forum-container-discussions">
            <h2 className="forum-container-discussions-h2">Les discussions récentes</h2>
          </div>

        </div>
      </div>
    );
  }
}
