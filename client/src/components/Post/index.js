import './index.css';

import { useState, useEffect } from 'react';

const Post = (props) => {
  const { data } = props;
  const { url, platform } = data;

  const [embeddedHTML, setEmbeddedHTML] = useState(null)

  useEffect(() => {
    async function fetchHTML() {
      const res = await fetch(`/api/proxy/${platform}?url=${url}`);
      console.log(res);
      const { html } = await res.json();
      setEmbeddedHTML(html);
    }

    if (!embeddedHTML) {
      fetchHTML();
    } else {
      switch (platform) {
        case 'twitter':
          if (window.twttr) window.twttr.widgets.load()
          break;
        case 'instagram':
          if (window.instgrm) window.instgrm.Embeds.process()
          break;
        case 'facebook':
          if (window.FB) window.FB.XFBML.parse();
          break;
        default:
      }
    }
  }, [embeddedHTML, url, platform]);

  return <div class='Post' dangerouslySetInnerHTML={{__html: embeddedHTML}}></div>
};

export default Post;