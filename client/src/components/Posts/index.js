import { useSelector, useDispatch } from 'react-redux';
import { getNextPage, page } from '../../api/post';

import './index.css';

import Post from '../Post';
import PrevPageButton from '../PrevPageButton';
import NextPageButton from '../NextPageButton';
import notify from '../../util/notify';

let loadedNextPage = false;

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);


  function onScroll(e) {
    const { target } = e;
    const percent = ((target.scrollLeft * 1.0) / target.scrollWidth) * 100;

    if (percent >= 120 && posts.length > 0 && !loadedNextPage) {
      console.log('Next page!');
      loadedNextPage = true;
      getNextPage()
      .then(posts => {
        dispatch({ type: 'posts/page', payload: posts });
        loadedNextPage = false;
      })
      .catch(_ => notify('An error occurred.'));
    }
  }

  return (
    <div className='Posts' id='Posts' onScroll={onScroll}>
        {(page > 0) ? <PrevPageButton /> : ''}
        {posts.map(post => (
          <Post data={post} key={post.url} />
        ))}
        <NextPageButton />
    </div>
  );
};

export default Posts;