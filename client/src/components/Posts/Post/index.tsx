//@ts-nocheck
import c from './index.module.css';

import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { authFetch } from 'util/auth';
import store from 'store';
import useTracker from 'hooks/useTracker';
import Button from 'components/Button';
import Icon from 'components/Icon';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  INSTITUTION,
  IDENTITIES,
} from 'util/filterData';
import AuthorInfo from '../AuthorInfo';
import EditTags from '../EditTags';
const embedHTMLCache = [];
let timeout: any;

function waitForEmbed(parent, callback) {
  const iframe = parent.querySelector('iframe');
  if (iframe) {
    iframe.onload = callback;
    return;
  }
  timeout = setTimeout(() => {
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

  const embedHTML = embedHTMLCache[platformID]
    ? embedHTMLCache[platformID]
    : '';

  // Determine if post is a retweet
  const retweet = platform === 'twitter' && data.content.startsWith('RT @');

  //  tags , combine account categories, account type, and identities
  const TAGS = { ...ACC_CATEGORIES, ...INSTITUTION, ...IDENTITIES };

  const wait = useCallback(() => {
    waitForEmbed(element, () => {
      setRendered(true);
    });
  }, [element]);
  useEffect(() => {
    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

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

  return (
    <div className="relative z-[1] ">
      <article
        className={`${c.overlayborder} min-w-[400px]  bg-white h-fit min-h-[30vh] relative w-full flex flex-col shadow-lg overflow-hidden rounded-xs ${c.Post} `}
      >
        {!isRendered ? (
          <div
            className={`flex justify-center  h-[75vh] items-center  bg-white border-b border-slate-300`}
          >
            <img
              className={`h-[80px] ${c.animation} `}
              src={coverImagePath}
              alt={platform}
            />
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
        <div className={`${c.container} bg-white`}>
          <div
            className={`${c.content} mr-[-2px] ${!isRendered ? ' hidden' : ''}`}
            id={elementID}
            dangerouslySetInnerHTML={{ __html: embedHTML }}
          ></div>
        </div>

        <footer className={`px-2 py-3 `}>
          <AuthorInfo
            name={data.author}
            topics={data.topics}
            accCategories={data.tags}
          />

          <div className={`flex gap-x-1 text-xs mt-4`}>
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
          <p className="flex flex-wrap gap-x-1">
            <b>Tags:</b>{' '}
            {tags &&
              tags
                .filter(
                  (tag) => tag.posts && tag.posts.find((item) => item === _id)
                )
                .map((tag) => tag.name)
                .join(', ')}
            <EditTags postId={_id} activeTags={tags} />
          </p>
          <Button className="text-xs" variant="transparent" size="md">
            View Relevent Resources <Icon type="arrow-right" size="xs" />
          </Button>
        </footer>
      </article>
      {data.tags && data.tags.some((i) => i === 'misinfo') && (
        <div
          className={`z-[100] absolute right-4 top-[-0.25rem] h-[4rem] w-fit text-slate-100 bg-red-500 px-4 pt-8 hover:opacity-30  drop-shadow-xs ${c.ribbon} rounded-t-[2px]`}
        >
          <Icon type="alert-octagon" />
        </div>
      )}
    </div>
  );
};

export default Post;
