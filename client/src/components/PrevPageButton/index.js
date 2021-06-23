import './index.css';

import { useDispatch } from 'react-redux';
import { getPrevPage, page } from '../../api/post';
import notify from '../../util/notify';

const NextPageButton = () => {
  const dispatch = useDispatch();

  function onClick() {
    if (page > 0) getPrevPage()
      .then(posts => {
        dispatch({ type: 'posts/set', payload: posts });
        document.getElementById('Posts').scrollTo(0, 0);
      })
      .catch(_ => { notify('An error occurred.'); });
  }

  return (
    <div className='PageButton' onClick={onClick}>
      <button>Previous Page</button>
    </div>
  );
};

export default NextPageButton;