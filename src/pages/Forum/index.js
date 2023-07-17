import axios from 'axios';
import { Component } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

// Components
import Wrapper from '../../components/Wrapper';
import Post from '../../components/Post';

// Styles
import './styles.scss';

export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      categoriespost: [],
      searchTerm: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
      .then((response) => {
        const posts = response.data;
        this.setState({ posts });
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/categoriespost`)
      .then((response) => {
        const categoriespost = response.data;
        this.setState({ categoriespost });
      });
  }

  filterData = () => {
    const { searchTerm, posts } = this.state;
    return posts.filter((rawdata) => rawdata.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
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
            <ul>
              <input
                type="search"
                name="search"
                id="searchInput"
                placeholder="Ecrivez le nom de votre étirement..."
                value={searchTerm}
                onChange={this.handleSearch}
              />
              {categoriespost.map((category) => (
                <div className="posts-container-category" key={category.name}>
                  <div id={category.name} />
                  <h2 className="posts-container-h2">{category.name}</h2>
                  <ul className="posts-container-ul">
                    {filterData()
                      .filter((post) => post.category_post_id === category.id)
                      .map((post) => (
                        <Post
                          id={post.id}
                          title={post.title}
                          img={post.image}
                          alt={post.title}
                          hover={post.title}
                          key={post.id}
                          link={post.id}
                        />
                      ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
          <div className="forum-container-discussions">
            <h2 className="forum-container-discussions-h2">Les discussions récentes</h2>
            <NavLink to="/new-post" className="stretches-add-stretch-btn"> <AiFillPlusCircle /> Ajouter un étirement </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
