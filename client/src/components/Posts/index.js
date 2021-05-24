import { useSelector } from 'react-redux';

import './index.css';

import Post from '../Post';

const Posts = (props) => {
  const posts = useSelector(state => state.posts);

  return (
    <div className='Posts'>
        {posts.map(post => (
          <Post data={post} />
        ))}
    </div>
  );
};

export default Posts;