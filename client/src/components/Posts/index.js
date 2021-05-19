import { useSelector, useDispatch } from 'react-redux';

import './index.css';

import Post from '../Post';

const Posts = (props) => {
  const posts = useSelector(state => state.posts);
  // const posts = require('../demo_aggie_data_covid_tw_ig.json');
  console.log(posts);

  return (
    <div className='Posts'>
        {posts.map(post => (
          <Post data={post} />
        ))}
    </div>
  );
};

export default Posts;