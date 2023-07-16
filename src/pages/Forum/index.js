import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Wrapper from '../../components/Wrapper';
import Post from '../../components/Post';

import './styles.scss';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
      .then((response) => {
        const postsData = response.data;
        setPosts(postsData);
      })
      .catch((error) => {
        toast.warning(error);
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/categoriespost`)
      .then((response) => {
        const categoriesData = response.data;
        setCategories(categoriesData);
      })
      .catch((error) => {
        toast.warning('Error fetching categories:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterData = () => posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
              onChange={handleSearch}
            />
            {categories.map((category) => (
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
        </div>
      </div>
    </div>
  );
}
