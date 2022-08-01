//@ts-nocheck
import c from './index.module.css';

import { useState, useEffect, useCallback } from 'react';
import { authFetch } from 'util/auth';
import store from 'store';
import useTracker from 'hooks/useTracker';
import Button from 'components/Button';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  INSTITUTION,
  IDENTITIES,
} from 'util/filterData';
import EditTags from '../EditTags';
import { useAppSelector } from 'hooks/useTypedRedux';
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
  const tags = useAppSelector((state) => state.tags.alltags);

  const [isLoaded, setLoaded] = useState(false);
  const [isRendered, setRendered] = useState(false);
  const { trackEvent } = useTracker();

  const wait = useCallback(() => {
    waitForEmbed(element, () => {
      setRendered(true);
    });
  }, [element]);

  useEffect(() => {
    async function fetchHTML() {
      const res = await authFetch(`/api/proxy/${platform}?url=${url}`);
      const { html } = await res.json();
      embedHTMLCache[platformID] = html;
    }
    if (!isLoaded) {
      if (!embedHTMLCache[platformID]) {
        fetchHTML().then(
          () => setLoaded(true),
          () => setLoaded(false)
        );
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

  //  tags , combine account categories, account type, and identities
  const LABELS = { ...ACC_CATEGORIES, ...INSTITUTION, ...IDENTITIES };

  // Function for copying link to post to user's clipboard
  function copyLink(e) {
    e.preventDefault();
    navigator.clipboard.writeText(data.url);
    trackEvent({ category: 'Post', action: 'Copy Link' });
  }

  // Function for copying text of post to user's clipboard
  function copyText(e) {
    e.preventDefault();
    navigator.clipboard.writeText(data.content);
    trackEvent({ category: 'Post', action: 'Copy Text' });
  }

  // Function for copying post and opening posting menu
  function createPost(e) {
    e.preventDefault();
    const postingMenu = store.postingMenu;
    const postText = data.content;
    store.dispatch({ type: 'postingMenu/set', payload: !postingMenu });
    store.dispatch({ type: 'postingText/set', payload: postText });
    trackEvent({
      category: 'Post',
      action: 'Send to Posting Menu',
    });
  }

  // some FB posts render with a transparent background
  const containerClassName =
    platform === 'facebook' ? 'container facebook' : 'container';

  // if (isRendered) {
  //   return ();
  // } else {
  //   return ();
  // }

  return (
    <div className={`flex-shrink min-w-[400px] h-full w-full ${c.Post}`}>
      {!isRendered ? (
        <div className={`border border-slate-300 ${c.cover}`}>
          <img src={coverImagePath} alt={platform} />
        </div>
      ) : (
        ''
      )}
      {retweet ? (
        <div className={c.retweet}>
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
      <div className={c.annotations}>
        <div className={``}>
          <p>
            <b>Topics:</b>{' '}
            {data.topics &&
              data.topics
                .map((topic) => COVID_TOPICS[topic])
                .filter(Boolean)
                .join(', ')}
          </p>
          <p>
            <b>Account:</b>{' '}
            {data.labels &&
              data.labels
                .map((label) => LABELS[label])
                .filter(Boolean)
                .join(', ')}
          </p>
          <p>
            <b>customTags:</b>{' '}
            {tags &&
              tags
                .filter((tag) => tag.posts.find((item) => item === _id))
                .map((tag) => tag.name)
                .join(', ')}
          </p>
        </div>
        <div className={`flex space-x-1 pb-4 `}>
          <Button variant="outline" size="md" onClick={copyLink}>
            Copy link
          </Button>
          <Button variant="outline" size="md" onClick={copyText}>
            Copy text
          </Button>
          <Button variant="primary" size="md" onClick={createPost}>
            Make Post
          </Button>
        </div>
        <EditTags postId={_id} activeTags={tags} />
      </div>
    </div>
  );
};

export default Post;
