import './index.css';

const Post = (props) => {
  const { data } = props;
  const { url } = data;
  return (
    <div class='Post'>
      {url}
    </div>
  );
};

export default Post;