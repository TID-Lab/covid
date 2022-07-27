import Button from 'components/Button';

import { ReactNode, useRef } from 'react';
import useTracker, { MatomoCategories } from 'hooks/useTracker';

interface PostsProps {
  page: number;
  children: ReactNode;
  hasContent: boolean;
  isLastPage: boolean;
  changePage: any;
  category: MatomoCategories;
}
const Posts = ({
  page,
  children,
  hasContent,
  isLastPage,
  changePage,
  category,
}: PostsProps) => {
  const postContainer = useRef<HTMLDivElement>(null);
  const { trackEvent } = useTracker();

  // set new page, then scroll back to top
  function onClick(toPage: number, trackAction: string) {
    changePage(toPage);
    postContainer!.current!.scrollTo(0, 0);
    trackEvent({
      category: category,
      action: trackAction,
    });
  }
  if (hasContent) {
    return (
      <div
        ref={postContainer}
        className="grid-flow-col grid overflow-auto grid-rows-1 py-2 px-6 gap-x-8 bg-slate-100 pt-13 hoverscroll "
        style={{ overflow: 'overlay' }}
      >
        {page > 0 && (
          <div className="h-[80vh] flex justify-center items-center w-[400px]">
            <Button onClick={() => onClick(-1, 'Navigate to Previous Page')}>
              Previous Page
            </Button>
          </div>
        )}

        {children}

        {!isLastPage && (
          <div className="h-[80vh] flex justify-center items-center w-[400px]">
            <Button onClick={() => onClick(1, 'Navigate to Next Page')}>
              Next Page
            </Button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="grid place-items-center bg-slate-100" id="NoResults">
        <p className="font-medium text-lg">No results found.</p>
      </div>
    );
  }
};

export default Posts;
