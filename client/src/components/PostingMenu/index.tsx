import c from './index.module.css';

import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { twitterLogin, twitterLogout } from 'api/auth';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import PopupModal from '../PopupModal';
import Button from 'components/Button';
import useTracker from 'hooks/useTracker';
import Icon from 'components/Icon';

const states = {
  successPost: 'Post has been sent successfully',
  failPost: 'Unknown error has occured while posting',
  failPost401: 'Login has expired! please login again',
  failPost400:
    'Bad input. (Likely a duplicate tweet, please write something else!)',
  successLogin: 'successfuly logged in to twitter account',
  failLogin: 'Failed to log in to twitter account',
  none: '',
};

const notifStyle = {
  success: ' bg-emerald-100 border-emerald-300  ',
  fail: ' bg-red-100 border-red-300 ',
  none: ' invisible ',
};
type stateType = keyof typeof states;
type notifStyleType = keyof typeof notifStyle;

function twitterLogoutAndUpdateLoginStatus(setTwitterLoginStatus: any) {
  twitterLogout();
  setTwitterLoginStatus(false);
}
function checkOAuth(history: any) {
  return (async () => {
    const { oauth_token, oauth_verifier } = queryString.parse(
      window.location.search
    );

    if (oauth_token && oauth_verifier) {
      history.push('/social-media-dashboard');
      try {
        //Oauth Step 3
        const res = await fetch('/api/auth/twitter/oauth/access_token', {
          method: 'POST',
          body: JSON.stringify({
            oauth_token: oauth_token,
            oauth_verifier: oauth_verifier,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return res.status === 200;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  })();
}

const PostingMenu = () => {
  const [twitterLoginStatus, setTwitterLoginStatus] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [pictureList, setPictureList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postState, setPostState] = useState<stateType>('none');

  const postText = useAppSelector((state) => state.postingText);
  const { trackEvent } = useTracker();
  const dispatch = useAppDispatch();

  let textAreaRef = useRef<HTMLTextAreaElement>(null);

  function closeClick() {
    dispatch({ type: 'postingMenu/set', payload: false });
  }

  function twitterPost() {
    (async () => {
      dispatch({
        type: 'postingText/set',
        payload: textAreaRef.current !== null ? textAreaRef.current.value : '',
      });
      setButtonDisabled(true);
      if (characterCount === 0) {
        alert('Cannot post with empty message');
        setButtonDisabled(false);
        return;
      } else if (characterCount >= 280) {
        alert('Cannot post with more than 280 characters');
        setButtonDisabled(false);
        return;
      }

      try {
        const res = await fetch('/api/proxy/twitter/tweet', {
          method: 'POST',
          body: JSON.stringify({
            status:
              textAreaRef.current !== null ? textAreaRef.current.value : '',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Unauthorized means we reset login status
        if (res.status === 401) {
          setTwitterLoginStatus(false);
          setPostState('failPost401');
          trackEvent({
            category: 'Post',
            action: 'Post to Twitter',
            name: '401 error',
          });
        } else if (res.status === 400) {
          setPostState('failPost400');

          trackEvent({
            category: 'Post',
            action: 'Post to Twitter',
            name: '400 error',
          });
        } else {
          setShowSuccess(true);
          setPostState('successPost');

          trackEvent({
            category: 'Post',
            action: 'Post to Twitter',
            name: 'success!',
          });
        }
      } catch (error) {
        console.error(error);
        setPostState('failPost');

        trackEvent({
          category: 'Post',
          action: 'Post to Twitter',
          name: error as string,
        });
      }
      setButtonDisabled(false);
    })();
  }

  const instagramPostHandler = async (event: any) => {
    event.preventDefault();

    if (textAreaRef.current !== null) {
      if (!navigator.clipboard) {
        // Clipboard API not available
        return;
      }
      const text = textAreaRef.current.value;
      try {
        await navigator.clipboard.writeText(text);
        event.target.textContent = 'Copied to clipboard';
      } catch (err) {
        console.error('Failed to copy!', err);
      }
      setShowModal(true);
    }
    // output = pictureList[0]
    // const blob = new Blob([output]);                   // Step 3
    // const fileDownloadUrl = URL.createObjectURL(blob); // Step 4
    // this.setState ({fileDownloadUrl: fileDownloadUrl}, // Step 5
    //   () => {
    //     this.dofileDownload.click();                   // Step 6
    //     URL.revokeObjectURL(fileDownloadUrl);          // Step 7
    //     this.setState({fileDownloadUrl: ""})
    // })
  };

  function returnStyle() {
    if (postState.includes('fail')) return 'fail';
    if (postState.includes('success')) return 'success';
    else return 'none';
  }
  // History is for clearing the query strings when getting the callback
  let history = useHistory();
  // This checks the status once after the component is rendered

  useEffect(() => {
    const AsyncTwitterLoginStatus = async () => {
      setTwitterLoginStatus(await checkOAuth(history));
    };
    const AsyncTimeoutButton = async () => {
      window.setTimeout(function () {
        setButtonDisabled(false);
      }, 5000);
    };

    AsyncTimeoutButton().catch(console.error);
    AsyncTwitterLoginStatus().catch(console.error);
  }, []);

  useEffect(() => {
    if (postText !== '') {
      setCharacterCount(postText.length);
    }
  }, [postText]);
  // combine these use effects?
  // useEffect(() => {
  //   if (window && document) {
  //     const script = document.createElement('script');
  //     const body = document.getElementsByTagName('body')[0];
  //     script.src = 'https://cse.google.com/cse.js?cx=23272e42b5a598933';
  //     body.appendChild(script);
  //     // script.addEventListener('load', () => {
  //     //   // window.hbspt.forms.create({
  //     //   //   // this example embeds a Hubspot form into a React app but you can tweak it for your use case
  //     //   //   // any code inside this 'load' listener will run after the script is appended to the page and loaded in the client
  //     //   // })
  //     // })
  //   }
  // }, []);

  var visibility = c.hide;
  const postingMenuStatus = useAppSelector((state) => state.postingMenu);
  if (postingMenuStatus) {
    visibility = c.show;
  }

  function wordCount(e: ChangeEvent<HTMLTextAreaElement>) {
    var currentText = e.target.value;
    // var characterCount = currentText.length;
    // setCharacterCount(characterCount);
    // This may be wasteful, temp solution
    dispatch({ type: 'postingText/set', payload: currentText });
  }

  // const returnFileSize = (number: number) => {
  //   if (number < 1024) {
  //     return number + 'bytes';
  //   } else if (number >= 1024 && number < 1048576) {
  //     return (number / 1024).toFixed(1) + 'KB';
  //   } else if (number >= 1048576) {
  //     return (number / 1048576).toFixed(1) + 'MB';
  //   }
  // };

  // const handleSubmission = (event: any) => {
  //   const files = [...event.target.files];
  //   setPictureList([]);
  //   setPictureList((pictureList) => [...pictureList, files]);
  // };

  // const deleteElement = (nameVal: string) => {
  //   setPictureList((pictureList) => [
  //     pictureList[0].filter((item: any) => item.name !== nameVal),
  //   ]);
  // };

  // useEffect(() => {
  //   const preview = document.querySelector('.preview');
  //   while (preview.firstChild) {
  //     preview.removeChild(preview.firstChild);
  //   }
  //   if (pictureList.length !== 0) {
  //     const array = document.createElement('ol');
  //     preview.appendChild(array);

  //     for (let i = 0; i < pictureList.length; i++) {
  //       for (let j = 0; j < pictureList[0].length; j++) {
  //         const listItem = document.createElement('li');
  //         const paragraph = document.createElement('p');
  //         const button = document.createElement('button');
  //         button.id = pictureList[i][j].name;
  //         button.innerHTML = "DELETE";
  //         button.style.background = "#FF0000";
  //         button.onclick = function () { deleteElement(pictureList[i][j].name); }

  //         paragraph.textContent = `File name ${pictureList[i][j].name}, file size ${returnFileSize(pictureList[i][j].size)}.`;
  //         // const img = document.createElement('img');
  //         // img.src = URL.createObjectURL(currentFiles[i]);
  //         // listItem.appendChild(img);
  //         listItem.appendChild(paragraph);
  //         listItem.appendChild(button);
  //         array.appendChild(listItem);
  //       }
  //     }
  //   }
  // });

  // need to figure out disabling login button since spamming it sends multiple requests (look into event.preventDefault())
  return (
    <div id="flyoutMenu" className={`${visibility} ${c.flyoutMenu}`}>
      <div className="flex flex-col gap-y-4 px-9 py-9 h-full">
        <div className="flex justify-between items-center">
          {/* <b style={{margin: "0", marginLeft: "1rem", marginRight: "1rem", paddingTop: "8px"}}> Search Trusted Resources </b> */}
          <h3 className="text-lg">
            <b> Create Post</b>
          </h3>
          <Button
            variant="secondary"
            size="md"
            onClick={closeClick}
            aria-label="close"
          >
            <Icon type="x" />
          </Button>
        </div>
        {/* <div class={c.gcse_search}></div> */}
        <div className="h-[5rem]">
          <div className={`border ${notifStyle[returnStyle()]}`}>
            {states[postState]}
          </div>
        </div>
        <div className="flex-grow">
          <textarea
            id="postInput"
            className="w-full h-2/3 my-3 py-7 px-6  resize-none rounded-xs bg-slate-100 border border-slate-300 focus:border focus:bg-blue-100 focus:border-blue-300 "
            placeholder="Draft your message here "
            ref={textAreaRef}
            value={postText ? postText : ''}
            onChange={wordCount}
          />
          <div className="text-sm font-medium bg-slate-200 w-2/3 flex justify-between px-6 py-2 items-center rounded-full ">
            <p className="before:content-['*'] before:h-[1em] before:w-[1em] before:mr-2 before:block flex items-center before:bg-slate-500 before:rounded-full">
              Charcter Count
            </p>
            <p>{characterCount}</p>
          </div>
        </div>

        {/* <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value}),'_blank')}>Tweet</button> */}
        {/* add undo button perhaps */}
        <div className="grid grid-flow-row gap-4 mt-4 justify-self-end ">
          <div className="flex gap-4 items-center">
            <Button
              id="postButtonId"
              className="text-center"
              variant="primary"
              disabled={buttonDisabled}
              onClick={() =>
                twitterLoginStatus
                  ? twitterPost()
                  : twitterLogin(setButtonDisabled)
              }
            >
              <Icon type="twitter-sm" />
              {'Post to Twitter'}
            </Button>
            <div>
              {twitterLoginStatus ? (
                <Button
                  className=" text-center"
                  variant="transparent"
                  size="sm"
                  onClick={() => {
                    twitterLogoutAndUpdateLoginStatus(setTwitterLoginStatus);
                  }}
                >
                  <Icon type="log-out" />
                </Button>
              ) : (
                <Button
                  className=" text-center text-sm"
                  variant="secondary"
                  size="md"
                  rounded
                  aria-label="login"
                  onClick={() => {
                    twitterLogoutAndUpdateLoginStatus(setTwitterLoginStatus);
                  }}
                >
                  <Icon type="arrow-right-sm" />
                  Login
                </Button>
              )}
            </div>
          </div>
          <Button
            className=" text-center w-fit "
            variant="primary"
            onClick={instagramPostHandler}
          >
            <Icon type="instagram-sm" />
            Post to Instagram
          </Button>
        </div>

        {showModal && (
          <PopupModal
            content={
              <>
                <b>Copied Post to Clipboard</b>
                <p>Follow these 3 steps on Instagram: </p>
                <ol>
                  <li>Click on + in the header menu</li>
                  <li>Select relevant images</li>
                  <li>Paste the caption</li>
                </ol>
                <button
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  {' '}
                  Continue to Instagram{' '}
                </button>
              </>
            }
            handleClose={() => {
              setShowModal(!showModal);
            }}
          />
        )}

        {showSuccess && (
          <PopupModal
            content={
              <>
                <b>Successfully posted to Twitter!</b>
              </>
            }
            handleClose={() => {
              setShowSuccess(!showSuccess);
            }}
          />
        )}
        {/* <form method="post" enctype="multipart/form-data">
          <div>
              <div>
                <label for="image_uploads">Insert Image or Video </label>
                <input type="file" id="image_uploads" name="image_uploads" accept="image/*, video/*" onChange={handleSubmission} multiple></input>
                <button> Submit</button>
              </div>
              <div class="preview"> </div>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default PostingMenu;
