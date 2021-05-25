import { useSelector } from 'react-redux';

import './index.css';

import Post from '../Post';

const Posts = () => {
  const posts = useSelector(state => state.posts);

  return (
    <div className='Posts'>
        {posts.map(post => (
          <Post data={post} key={post.url} />
        ))}
    </div>
  );
};

export default Posts;