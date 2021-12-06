/*global FB*/
import './index.css';
import { useSelector } from 'react-redux';
import {useState, useCallback} from 'react';


function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

// function loginToTwitter() {
//   (async () => {window.open(await (loginSequence()).url,'_blank')})()
// }
async function loginToFacebook() {
  FB.login(function(response) {
    if (response.authResponse) {
      document.getElementById("loginAndPostButtonFB").innerHTML = "Post to Facebook";
    } else {
      console.log('User cancelled login or did not fully authorize.');
      document.getElementById("loginAndPostButtonFB").innerHTML = "Login to Facebook";
    }
  });
  // }, {scope: 'pages_manage_posts, pages_read_engagement'});
  // const client = new TwitterApi({ appKey: CONSUMER_KEY, appSecret: CONSUMER_SECRET });
  // console.log("middle");
  // const authLink = await client.generateAuthLink(CALLBACK_URL);
  // console.log(authLink)
  // console.log(authLink.url);
  // console.log("FINISHED!!!!");
  // return authLink;
}

async function onLoadFBButton() {
  window.FB.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      document.getElementById("loginAndPostButtonFB").innerHTML = "Post to Facebook";
    } else {
      console.log('User cancelled login or did not fully authorize.');
      document.getElementById("loginAndPostButtonFB").innerHTML = "Login to Facebook";
    }
  })
}
const PostingMenu = () => {
  var visibility = "hide";
 
  const postingMenuStatus = useSelector(state => state.postingMenu);
  if (postingMenuStatus) {
    visibility = "show";
  }
  const [fbUserAccessToken, setFbUserAccessToken] = useState();
  const [fbPageAccessToken, setFbPageAccessToken] = useState();
  // const [postText, setPostText] = React.useState();
  // const [isPublishing, setIsPublishing] = React.useState(false);
window.fbAsyncInit = function () {
            window.FB.init({
                appId: "176818874280010",
                cookie: true,
                xfbml: true,
                version: 'v12.0'
            });

            // auto authenticate with the api if already logged in with facebook
            // window.FB.getLoginStatus(({ authResponse }) => {
            //     if (authResponse) {
            //         accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
            //     } else {
            //         resolve();
            //     }
            // });
          }

          // const logInToFB = useCallback(() => {
          //   window.FB.login((response) => {
          //     setFbUserAccessToken(response.authResponse.accessToken);
          //   }, {scope: });
          // }, []);


  return (
    <div id="flyoutMenu" className={visibility}>
      <div className="inputMenu">
        <textarea id="postInput" type="text" placeholder="Post Message "></textarea>
        {/* <button className="postButton" onClick={() => {FB.ui({method: 'feed', link: 'peach.ipat.gatech.edu'}, function(response){})}}> Post on FB </button> */}
        
        <button className="postButton" id="loginAndPostButtonFB" onLoad={onLoadFBButton} onClick={() => {
          window.FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
              FB.api('/me/feed', 'post', { message: document.getElementById("postInput").value }, function(response) {
                if (!response || response.error) {
                  alert('Error occurred');
                } else {
                  alert('Post ID: ' + response.id);
                }
              });
            } else {
              loginToFacebook();
            }
          })}}> Login to Facebook </button>

        <button className="postButton" onClick={() => {FB.api('/me/feed', 'post', { message: document.getElementById("postInput").value }, function(response) {
          if (!response || response.error) {
            alert('Error occurred');
          } else {
            alert('Post ID: ' + response.id);
          }
        });}}>Post to FB</button>
        <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value}),'_blank')}>Tweet</button>
        {/* <button className="postButton" onClick={loginToTwitter}>Login</button> */}

        {/* <a className="blueButton" href="http://localhost:5000/auth/twitter">Login to Twitter</a> */}
        {/* <button className="postButton" onClick={() => window.open("http://localhost:5000/auth/twitter",'_blank')}>Login to Twitter</button> */}
        
        {/* <text> {authLink.url} </text> */}
        {/* <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value, "in_reply_to":s }),'_blank')}>Tweet</button> */}
      </div>
    </div>
  );
}

export default PostingMenu;