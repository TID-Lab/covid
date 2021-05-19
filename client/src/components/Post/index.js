import './index.css';

import { useState, useEffect } from 'react';

const Post = (props) => {
  const { data } = props;
  // const { url } = data.url;
  // const { platform } = data._media;

  // console.log(data.url);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    // console.log(data._media[0]);
    if (data._media[0] === 'twitter') {
      console.log(data.url);
      
      // fetch('https://publish.twitter.com/oembed', {
      //   method: 'GET',
      //   headers: {'url': data.url},
      //   mode: 'no-cors'
      // })
      const fetch_url = 'https://publish.twitter.com/oembed?url=' + data.url;
      console.log(fetch_url);
      fetch(fetch_url)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItem(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    };
    
  }, [data._media, data.url])

  if (error) {
    return (
      <div class='Post'>
        Error: {error.message}
        <br></br>
        {data.url}
      </div>
    );
  } else if (!isLoaded) {
    return(
      <div class='Post'>
        Loading...
        <br></br>
        {data.url}
      </div>
    );
  } else {
    return (
      <div class='Post'>
        {item.html}
        <br></br>
        {data.url}
      </div>
    );
  }

  // if (data._media[0] === 'twitter') {
  //   const fetch_url = 'https://publish.twitter.com/oembed?url=' + data.url;
  //   return (
  //     <div class='Post'>
  //       {fetch_url}
  //       <br></br>
  //       {data.url}
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div class='Post'>
  //       {data.url}
  //     </div>
  //   );
  // }

  // return (
  //   <div class='Post'>
  //     {data.url}
  //   </div>
  // )

};

export default Post;