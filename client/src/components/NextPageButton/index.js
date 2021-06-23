import './index.css';

import { useDispatch } from 'react-redux';
import { getNextPage } from '../../api/post';
import notify from '../../util/notify';

const NextPageButton = () => {
  const dispatch = useDispatch();

  function onClick() {
    getNextPage()
      .then(posts => {
        dispatch({ type: 'posts/set', payload: posts });
        document.getElementById('Posts').scrollTo(0, 0);
      })
      .catch(_ => { notify('An error occurred.'); });
  }

  return (
    <div className='PageButton' onClick={onClick}>
      <button>Next Page</button>
    </div>
  );
};

export default NextPageButton;