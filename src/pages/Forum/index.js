import axios from 'axios';
import { Component } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import {
  bool,
} from 'prop-types';

// Components
import Wrapper from '../../components/Wrapper';
import Post from '../../components/Post';

// Styles
import './styles.scss';

export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtredPosts: [],
      categoriespost: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
      .then((response) => {
        const filtredPosts = response.data;
        this.setState({ filtredPosts });
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/postcategories`)
      .then((response) => {
        const categoriespost = response.data;
        this.setState({ categoriespost });
      });
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  filterData = () => {
    const { searchTerm, filtredPosts } = this.state;
    return filtredPosts.filter((rawdata) => rawdata.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  render() {
    const { isLogged } = this.props;
    const { searchTerm, categoriespost } = this.state;
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
            {isLogged ? (
              <div className="forum-container-subject-add">
                <NavLink to="/new-post" className="stretches-add-stretch-btn"> <AiFillPlusCircle /> Ajouter un étirement </NavLink>
              </div>
            ) : null}
            <ul>
              <input
                type="search"
                name="search"
                id="searchInput"
                placeholder="Ecrivez le nom de votre étirement..."
                value={searchTerm}
                onChange={this.handleSearch}
              />
              {categoriespost.map((category_post) => (
                <div className="posts-container-category" key={category_post.name}>
                  <div id={category_post.name} />
                  <h2 className="posts-container-h2">{category_post.name}</h2>
                  <ul className="posts-container-ul">
                    {filterData()
                      .filter((filtredPosts) => filtredPosts.category_id === category_post.id)
                      .map((filtredPosts) => (
                        <Post
                          id={filtredPosts.id}
                          title={filtredPosts.title}
                          text_content={filtredPosts.description_content}
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

Forum.propTypes = {

  isLogged: bool.isRequired,
};
