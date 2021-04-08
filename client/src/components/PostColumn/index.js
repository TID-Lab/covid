import './index.css';

import Post from '../Post';

const PostColumn = (props) => {
  const { second, third } = props;
  let classes = 'PostColumn';
  if (second) classes += ' Second';
  if (third) classes += ' Third';
  return (
    <div className={classes}></div>
  );
};

export default PostColumn;