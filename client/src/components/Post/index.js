import './index.css';

import { useState, useEffect } from 'react';

const Post = (props) => {
  const { data } = props;
  // console.log(data.url);

  // Setting the API call params by platform
  console.log(data._media[0]);
  var fetchUrl = '';

  if (data._media[0] === 'twitter') {
    // console.log(data.url);
    fetchUrl = 'twitter/oembed?url=' + data.url; //'https://publish.twitter.com/oembed?url=' + data.url;
  } else if (data._media[0] === 'crowdtangle') {
    // console.log(data.metadata.platform);
    if (data.metadata.platform === 'Facebook') {
      fetchUrl = fetchUrl = '/oembed/facebook' + data.url; //'https://graph.facebook.com/v10.0/oembed_post?url=' + data.url + '&access_token=PLACEHOLDER';
    }
    if (data.metadata.platform === 'Instagram') {
      fetchUrl = fetchUrl = '/oembed/instagram' + data.url; //'https://graph.facebook.com/v10.0/instagram_oembed?url=' + data.url + '&access_token=PLACEHOLDER';
    }
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  
  useEffect(() => {

    console.log(fetchUrl);

    // fetch('https://publish.twitter.com/oembed', {
    //   method: 'GET',
    //   headers: {'url': data.url}
    // })    
    fetch(fetchUrl, {method: 'GET'})
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
    
  }, []) //fetchUrl, headers

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
    // console.log(item);
    return (
      <>
        <div class='Post' dangerouslySetInnerHTML={{__html: item.html}}>
        </div>
        {data.url}
      </>
    );
  }

  // return (
  //   <div class='Post'>
  //     {data.url}
  //   </div>
  // )

};

export default Post;