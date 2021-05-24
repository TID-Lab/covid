import { useSelector } from 'react-redux';

import './index.css';

import Post from '../Post';

const Posts = (props) => {
  // const posts = useSelector(state => state.posts);

  const posts = [
    {
      platform: 'twitter',
      url: 'https://twitter.com/BHolmesDev/status/1394843853010657281'
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/p/fA9uwTtkSN/',
    }
  ];

  return (
    <div className='Posts'>
        {posts.map(post => (
          <Post data={post} />
        ))}
    </div>
  );
};

export default Posts;