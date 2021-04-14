import './index.css';

import Post from '../Post';

const testData = require('../demo_aggie_data_covid_tw_ig.json');
console.log(testData);

const PostColumn = (props) => {
  const { second, third } = props;
  let classes = 'PostColumn';
  if (second) classes += ' Second';
  if (third) classes += ' Third';
  
  // doesn't work:
  // testData.foreach(function(d) {
  //   console.log(d);
  // })

  // Create a post component for every post in the data:
  const posts = testData.map((d) => 
    // console.log(d._media)
    <Post media={d._media} url={d.url} />
  );
  
  return (
    <div className={classes}>
      {posts}
    </div>
  );
};

export default PostColumn;