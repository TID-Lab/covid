// @ts-nocheck
import c from './index.module.css';

import { useDispatch } from 'react-redux';
import { getPrevPage, page } from 'api/post';
import notify from 'util/notify';
import Button from 'components/Button';
import useTracker from 'hooks/useTracker';
const NextPageButton = () => {
  const dispatch = useDispatch();
  const {trackEvent} = useTracker();

  function onClick() {
    if (page > 0)
      getPrevPage()
        .then((posts) => {
          dispatch({ type: 'posts/set', payload: posts });
          trackEvent({ category: 'Monitoring Page', action: 'Navigate to Previous Page'} as MatomoEvent)

          document.getElementById('Posts').scrollTo(0, 0);
        })
        .catch((_) => {
          notify('An error occurred.');
        });
  }

  return (
    <div className="PageButton" onClick={onClick}>
      <Button>Previous Page</Button>
    </div>
  );
};

export default NextPageButton;
