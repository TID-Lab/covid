import { useAppSelector } from 'hooks/useTypedRedux';
import { page, lastPage } from 'api/post';

import Post from './Post';
import PageButton from './PageButton';
import { useRef } from 'react';

const Posts = () => {
  const postContainer = useRef<HTMLDivElement>(null);
  const posts = useAppSelector((state) => state.posts);
  if (posts.length > 0) {
    return (
      <div ref={postContainer} className="flex overflow-auto py-2 px-4 gap-x-6">
        {page > 0 && (
          <PageButton
            type="prev"
            text="Previous Page"
            parentRef={postContainer.current}
            track={{
              category: 'Monitoring Page',
              action: 'Navigate to Previous Page',
            }}
          />
        )}

        {posts.map((post) => (
          <Post data={post} key={post.url} />
        ))}

        {!lastPage && (
          <PageButton
            type="next"
            text="Next Page"
            parentRef={postContainer.current}
            track={{
              category: 'Monitoring Page',
              action: 'Navigate to Next Page',
            }}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="grid place-items-center" id="NoResults">
        <p className="bold text-lg">No results found.</p>
      </div>
    );
  }
};

export default Posts;
