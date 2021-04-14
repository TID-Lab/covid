import './index.css';

const Post = (props) => {
  
  
  return (
    <div class='Post'>
      {props.media}
      <br></br>
      {props.url}
    </div>
  );
};

export default Post;