import './index.css';

import { useState, useEffect, useCallback } from 'react';

const embedHTMLCache = [];

function waitForEmbed(parent, callback) {
  const isEmbedded = parent.querySelector('iframe');
  if (isEmbedded) return setTimeout(callback, 1000);
  setTimeout(() => {
    waitForEmbed(parent, callback);
  }, 10);
}

const Post = (props) => {
  const { data } = props;
  const { url, platform, platformID } = data;
  const coverImagePath = `/images/${platform}.png`;
  const elementID = `post-${platform}-${platformID}`;
  const element = document.getElementById(elementID);

  const [ isLoaded, setLoaded ] = useState(false);
  const [ isRendered, setRendered ] = useState(false);

  const wait = useCallback(
    () => {
      waitForEmbed(element, () => { setRendered(true) })
    },
    [ element ]
  )

  useEffect(() => {
    async function fetchHTML() {
      const res = await fetch(`/api/proxy/${platform}?url=${url}`);
      const { html } = await res.json();
      embedHTMLCache[platformID] = html;
    }
    if (!isLoaded) {
      if (!embedHTMLCache[platformID]) {
        fetchHTML().then(() => setLoaded(true));
      } else {
        setLoaded(true);
      }
    } else {
      switch (platform) {
        case 'twitter':
          if (window.twttr && window.twttr.widgets) window.twttr.widgets.load(element);
          break;
        case 'instagram':
          if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process(element)
          break;
        case 'facebook':
          if (window.FB && window.FB.XFBML) window.FB.XFBML.parse(element);
          break;
        default:
      }
      wait(platform, element);
    }
  }, [ isLoaded, platform, platformID, url, elementID, element, wait ]);

  const embedHTML = (embedHTMLCache[platformID]) ? embedHTMLCache[platformID] : '';
  const embedClass = 'content' + (!isRendered ? ' hidden' : '');

  return (
    <div className='Post'>
      {(!isRendered) ? (
        <div className='cover'>
          <img src={coverImagePath} alt={platform} />
        </div>
      ): ''}
      <div className={embedClass} id={elementID} dangerouslySetInnerHTML={{__html: embedHTML}}></div>
    </div>
  );
};

export default Post;