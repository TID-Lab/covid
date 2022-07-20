import { useAppDispatch } from 'hooks/useTypedRedux';
import { getPrevNextPage, getPage } from 'api/post';
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

  function onclick() {
    console.log(getPrevNextPage(type));
    if (getPage() > 0)
      getPrevNextPage(type)
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
    <div className="h-[80vh] flex place-items-center w-[400px]">
      <Button onClick={() => onclick()}>{text}</Button>
    </div>
  );
};

export default PageButton;
