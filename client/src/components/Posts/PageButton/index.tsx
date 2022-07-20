import { useAppDispatch } from 'hooks/useTypedRedux';
import { getPage, page } from 'api/post';
import notify from 'util/notify';
import Button from 'components/Button';
import useTracker, { MatomoEvent } from 'hooks/useTracker';

interface PageButtonProps {
  type: 'prev' | 'next';
  parentRef: any;
  track: MatomoEvent;
  text: string;
}

const PageButton = ({ type, parentRef, track, text }: PageButtonProps) => {
  const dispatch = useAppDispatch();
  const { trackEvent } = useTracker();

  function onClick() {
    if (page > 0)
      getPage(type === 'next' ? page + 1 : page - 1)
        .then((posts) => {
          dispatch({ type: 'posts/set', payload: posts });
          trackEvent(track);

          parentRef.scrollTo(0, 0);
        })
        .catch((_) => {
          notify('An error occurred while loading posts');
        });
  }

  return (
    <div
      className="h-[80vh] flex place-items-center w-[400px]"
      onClick={onClick}
    >
      <Button>{text}</Button>
    </div>
  );
};

export default PageButton;
