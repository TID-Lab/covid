// @ts-nocheck
import './index.css';

import { useState, useEffect, useCallback, useRef } from 'react';
import { authFetch } from '../../util/auth';
import store from '../../store';
import PopupModal from '../PopupModal';

const embedHTMLCache = [];

function waitForEmbed(parent, callback) {
  const iframe = parent.querySelector('iframe');
  if (iframe) {
    iframe.onload = callback;
    return;
  }
  setTimeout(() => {
    waitForEmbed(parent, callback);
  }, 10);
}

const Post = (props) => {
  const { data } = props;
  console.log(data);
  const { _id, url, platform, platformID } = data;
  const coverImagePath = `/images/${platform}.png`;
  const elementID = `post-${platform}-${platformID}`;
  const element = document.getElementById(elementID);

  const [isLoaded, setLoaded] = useState(false);
  const [isRendered, setRendered] = useState(false);

  const wait = useCallback(() => {
    waitForEmbed(element, () => {
      setRendered(true);
    });
  }, [element]);

  useEffect(() => {
    async function fetchHTML() {
      const res = await authFetch(`/api/proxy/${platform}?url=${url}`);
      try {
        var { html } = await res.json();
      } catch (error) {
        console.log(error);
      }
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
          if (window.twttr && window.twttr.widgets)
            window.twttr.widgets.load(element);
          break;
        case 'instagram':
          if (window.instgrm && window.instgrm.Embeds)
            window.instgrm.Embeds.process(element);
          break;
        case 'facebook':
          if (window.FB && window.FB.XFBML) window.FB.XFBML.parse(element);
          break;
        default:
      }
      wait(platform, element);
    }
  }, [isLoaded, platform, platformID, url, elementID, element, wait]);

  const embedHTML = embedHTMLCache[platformID]
    ? embedHTMLCache[platformID]
    : '';
  const embedClass = 'content' + (!isRendered ? ' hidden' : '');

  // Determine if post is a retweet
  const retweet = platform === 'twitter' && data.content.startsWith('RT @');

  // Getting topic and account tag labels for the post

  // Topics (from TopicFilter\index.js)
  const COVID_TOPICS = {
    // temporary
    all: 'All',
    vaccines: 'Vaccines',
    booster: 'Boosters',
    treatments: ' Treatments',
    variants: 'Variants',
    'long-hauler': 'Long COVID',
    testing: 'Testing',
    'covid-diabetes': 'COVID x Diabetes',
    georgia: 'Georgia',
  };
  //sortBy = useSelector(state => state.filters.sortBy);
  //dispatch = useDispatch();

  // Account tags (CATEGORIES from AccountCategories\index.js, plus institutional and GA)
  const LABELS = {
    all: 'All',
    government: 'Government',
    media: 'Media',
    faith: 'Faith',
    health: 'Health',
    diabetes: 'Diabetes',
    institutional: 'Institutional',
    georgia: 'Georgia',
    misinfo: 'Known Misinfo Spreaders',
    partners: 'Project Partners',
    trusted: 'Trusted Resources',
  };

  // Function for copying link to post to user's clipboard
  function copyLink(e) {
    e.preventDefault();
    navigator.clipboard.writeText(data.url);
  }

  // Function for copying text of post to user's clipboard
  function copyText(e) {
    e.preventDefault();
    navigator.clipboard.writeText(data.content);
  }

  // Function for copying post and opening posting menu
  function createPost(e) {
    e.preventDefault();
    const postingMenu = store.postingMenu;
    const postText = data.content;
    store.dispatch({ type: 'postingMenu/set', payload: !postingMenu });
    store.dispatch({ type: 'postingText/set', payload: postText });
  }

  // some FB posts render with a transparent background
  const containerClassName =
    platform === 'facebook' ? 'container facebook' : 'container';
  // if (isRendered) {
  //   return ();
  // } else {
  //   return ();
  // }
  //<p><b>Tags:</b> {data.customTags.map(tags => TAGS[tags]).filter(Boolean).join(', ')}</p>
  //<p><b>Account:</b> {data.labels.map(label => LABELS[label]).filter(Boolean).join(', ')}</p>

  return (
    <div className="Post">
      {!isRendered ? (
        <div className="cover">
          <img src={coverImagePath} alt={platform} />
        </div>
      ) : (
        ''
      )}
      {retweet ? (
        <div className="retweet">
          Retweeted by{' '}
          <a
            href={'https://twitter.com/' + data.author}
            target="_blank"
            rel="noreferrer"
          >
            @{data.author}
          </a>
          :
        </div>
      ) : (
        ''
      )}
      <div className={containerClassName}>
        <div
          className={embedClass}
          id={elementID}
          dangerouslySetInnerHTML={{ __html: embedHTML }}
        ></div>
      </div>
      <div className="annotations">
        <div className="column left">
          <p>
            <b>Topics:</b>{' '}
            {data.topics
              .map((topic) => COVID_TOPICS[topic])
              .filter(Boolean)
              .join(', ')}
          </p>
          <p>
            <b>Account:</b>{' '}
            {data.labels
              .map((label) => LABELS[label])
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
        <div className="column right">
          <form onSubmit={createPost}>
            <button className="submitButton" type="submit">
              Use as basis of a post
            </button>
          </form>
          <form onSubmit={copyLink}>
            <button className="submitButton" type="submit">
              Copy link
            </button>
          </form>
          <form onSubmit={copyText}>
            <button className="submitButton" type="submit">
              Copy text
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
//</>id="tagColor" name="tagColor" rows="1" ref={(textarea) => colorTextAreaRef = textarea}></textarea>
