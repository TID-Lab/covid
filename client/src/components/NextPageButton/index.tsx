// @ts-nocheck
import c from './index.module.css';
import Button from 'components/Button';

import { useDispatch } from 'react-redux';
import { getNextPage } from 'api/post';
import notify from 'util/notify';
import useTracker from 'hooks/useTracker';

const NextPageButton = () => {
  const dispatch = useDispatch();
  const { trackEvent } = useTracker();

  function onClick() {
    getNextPage()
      .then((posts) => {
        dispatch({ type: 'posts/set', payload: posts });
        trackEvent({
          category: 'Monitoring Page',
          action: 'Navigate to Next Page',
        });

        document.getElementById('Posts').scrollTo(0, 0);
      })
      .catch((_) => {
        notify('An error occurred.');
      });
  }

  return (
    <div className="PageButton" onClick={onClick}>
      <Button>Next Page</Button>
    </div>
  );
};

export default NextPageButton;
