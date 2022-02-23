/*global FB*/
import './index.css';
import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import { twitterLogin, twitterLogout } from '../../api/auth.js'
import queryString from 'query-string';
import { useHistory } from 'react-router-dom'


// function encodeQueryData(data) {
//   const ret = [];
//   for (let d in data)
//     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
//   return ret.join('&');
// }

function twitterLogoutAndUpdateLoginStatus(setTwitterLoginStatus) {
  twitterLogout()
  setTwitterLoginStatus(false)
}

function checkOAuth(history) {
  return (async() => {
    const {oauth_token, oauth_verifier} = queryString.parse(window.location.search); 
    
    if (oauth_token && oauth_verifier) {
      history.push('/social-media-dashboard')
      try {
        //Oauth Step 3
        const res = fetch('/api/auth/twitter/oauth/access_token', {
          method: 'POST', 
          body: JSON.stringify({oauth_token: oauth_token, oauth_verifier: oauth_verifier}),
          headers: {
             'Content-Type': 'application/json'
             }})
      
        return res.code == 200
      } catch (error) {
        console.error(error); 
      }
    }
    return false;
  })();
}

function twitterPost(characterCount, setLoginStatus, setCharacterCount) {
  (async() => {
    if (characterCount == 0) {
      alert("Cannot post with empty message");
      return;
    } else if (characterCount >= 280) {
      alert("Cannot post with more than 280 characters");
      return;
    }

    try {
      const res = await fetch('/api/proxy/twitter/tweet', {
        method: 'POST',
        body: JSON.stringify({status: document.getElementById("postInput").value}),
        headers: {
          'Content-Type': 'application/json'
          }})
      // Unauthorized means we reset login status
      if (res.status == 401) {
        alert("Login Expired")
        setLoginStatus(false)
      } else if (res.status == 400) {
        alert("Bad input. (Likely a duplicate tweet, please write something else!)")
      } else {
        document.getElementById("postInput").value = ''
        setCharacterCount(0)
      }
     } catch (error) {
        console.log(error)
     }
  })();
}

const PostingMenu = () => {
  const [twitterLoginStatus, setTwitterLoginStatus] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  
  // History is for clearing the query strings when getting the callback
  let history = useHistory();
  // This checks the status once after the component is rendered
  useEffect(() => {
    setTwitterLoginStatus(checkOAuth(history));
  },[])

  var visibility = "hide";
  const postingMenuStatus = useSelector(state => state.postingMenu);
  if (postingMenuStatus) {
    visibility = "show";
  }

  function wordCount(e){
    var currentText = e.target.value;
    var characterCount = currentText.length;
    setCharacterCount(characterCount);
  }

  return (
    <div id="flyoutMenu" className={visibility}>
      <div className="inputMenu">
        <textarea id="postInput" type="text" placeholder="Post Message " onChange={wordCount}></textarea>
        <text>{ "Character Count: " + characterCount}</text>
        {/* <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value}),'_blank')}>Tweet</button> */}
        {/* add undo button perhaps */}
        <button id="postButtonId" className="postButton" onClick={() => twitterLoginStatus ? twitterPost(characterCount, setTwitterLoginStatus, setCharacterCount): twitterLogin()}>{twitterLoginStatus ? "Post to Twitter": "Login to Twitter" }</button>
        <button className="postButton" onClick={() => {twitterLogoutAndUpdateLoginStatus(setTwitterLoginStatus)}}>Logout</button>
      </div>
    </div>
  );
}

export default PostingMenu;