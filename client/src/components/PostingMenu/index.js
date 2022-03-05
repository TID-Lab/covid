/*global FB*/
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import { twitterLogin, twitterLogout } from '../../api/auth.js'
import queryString from 'query-string';
import { useHistory } from 'react-router-dom'

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
        const res = await fetch('/api/auth/twitter/oauth/access_token', {
          method: 'POST', 
          body: JSON.stringify({oauth_token: oauth_token, oauth_verifier: oauth_verifier}),
          headers: {
             'Content-Type': 'application/json'
             }})
        return res.status == 200
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
  const postText = useSelector(state => state.postingText);
  
  function twitterPost(characterCount, setLoginStatus, setCharacterCount) {
    (async() => { 
      setButtonDisabled(true)
      if (characterCount == 0) {
        alert("Cannot post with empty message");
        setButtonDisabled(false)
        return;
      } else if (characterCount >= 280) {
        alert("Cannot post with more than 280 characters");
        setButtonDisabled(false)
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
          console.error(error)
      }
      setButtonDisabled(false)
    })();
    
  }
  // History is for clearing the query strings when getting the callback
  let history = useHistory();
  // This checks the status once after the component is rendered

  useEffect(async () => {
    setTwitterLoginStatus(await checkOAuth(history));
  },[])
  
  useEffect(async () => {
    window.setTimeout(function () {
      setButtonDisabled(false)
  },5000)
  },[])

  useEffect(() => {
    if (window && document) {
      const script = document.createElement('script')
      const body = document.getElementsByTagName('body')[0]
      script.src = 'https://cse.google.com/cse.js?cx=23272e42b5a598933'
      body.appendChild(script)
      // script.addEventListener('load', () => {
      //   // window.hbspt.forms.create({
      //   //   // this example embeds a Hubspot form into a React app but you can tweak it for your use case
      //   //   // any code inside this 'load' listener will run after the script is appended to the page and loaded in the client
      //   // })
      // })
    }
  }, [])

  const dispatch = useDispatch();
  // const postingMenu = useSelector(state => state.postingMenu);
  function closeClick() {
    dispatch({type: 'postingMenu/set', payload: false})
  }

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
  // need to figure out disabling login button since spamming it sends multiple requests
  return (
    <div id="flyoutMenu" className={visibility}>
      <div className="inputMenu">
        <div style={{display: "flex", flexDirection: "row"}}>
          <b style={{margin: "0", marginLeft: "1rem", paddingTop: "8px"}}> Search Trusted Resources </b>
          <button className="closeButton" onClick={closeClick}>Close</button>
        </div>
        <div class="gcse-search"></div>
        <hr style={{color: "grey", backgroundColor: "grey", height: 1, margin: 0}}/>
        
        <b style={{ marginBottom: "0", marginLeft: "1rem", marginTop:"1rem"}}> Compose Post </b>
        <textarea id="postInput" type="text" placeholder="Post Message " value = {postText} onChange={wordCount}></textarea>
        <p>{ "Character Count: " + characterCount}</p>
        {/* <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value}),'_blank')}>Tweet</button> */}
        {/* add undo button perhaps */}
        <div style={{display: "flex", flexDirection: "row"}}>
          <button id="postButtonId" className="postButton" disabled={buttonDisabled} onClick={() => twitterLoginStatus ? twitterPost(characterCount, setTwitterLoginStatus, setCharacterCount): twitterLogin(setButtonDisabled)}>{twitterLoginStatus ? "Post to Twitter": "Login to Twitter" }</button>
          <button className="postButton" onClick={() => {twitterLogoutAndUpdateLoginStatus(setTwitterLoginStatus)}}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default PostingMenu;