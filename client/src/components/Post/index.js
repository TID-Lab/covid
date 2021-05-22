import './index.css';

import { useState, useEffect } from 'react';

const Post = (props) => {
  const { data } = props;
  // console.log(data.url);

  // Setting the API call by platform
  console.log(data._media[0]);
  var fetchUrl = '';

  if (data._media[0] === 'twitter') {
    // console.log(data.url);
    fetchUrl = 'api/proxy/twitter?url=' + data.url;
  } else if (data._media[0] === 'crowdtangle') {
    // console.log(data.metadata.platform);
    if (data.metadata.platform === 'Facebook') {
      fetchUrl = fetchUrl = 'api/proxy/facebook?url=' + data.url;
    }
    if (data.metadata.platform === 'Instagram') {
      fetchUrl = fetchUrl = 'api/proxy/instagram?url=' + data.url;
    }
  };

  // Call the API to get the embedded code
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  
  useEffect(() => {

    console.log(fetchUrl);

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

  // Insert div with the embedded post HTML
  if (error) {
    return (
      <div class='Post'>
        Error: {error.message}
        <br></br>
        <a href={data.url}>{data.url}</a>
      </div>
    );
  } else if (!isLoaded) {
    return(
      <div class='Post'>
        Loading...
        <br></br>
        <a href={data.url}>{data.url}</a>
      </div>
    );
  } else {
    // console.log(item);
    return (
      <>
        <div class='Post' dangerouslySetInnerHTML={{__html: item.html}}>
        </div>
        <a href={data.url}>{data.url}</a>
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