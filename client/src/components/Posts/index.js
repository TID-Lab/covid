import './index.css';

import PostColumn from '../PostColumn';

const Posts = (props) => {
  return (
    <div className='Posts'>
        <PostColumn />
        <PostColumn second/>
        <PostColumn third/>
    </div>
  );
};

export default Posts;