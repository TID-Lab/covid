import { useSelector } from 'react-redux';
import { page, lastPage } from 'api/post';

import * as c from './index.module.css';


import Post from './Post';
import PrevPageButton from '../PrevPageButton';
import NextPageButton from '../NextPageButton';

const Posts = () => {
  const posts = useSelector(state => state.posts);

  return (
    <div className={c.Posts} id='Posts'>

        {(page > 0) ? <PrevPageButton /> : ''}

        {posts.map(post => (
          <Post data={post} key={post.url} />
        ))}

        {(!lastPage) ? <NextPageButton /> : ''}
    </div>
  );
};

export default Posts;