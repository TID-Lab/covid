import './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect, useRef } from 'react';
import { twitterLogin, twitterLogout } from '../../api/auth.js'
import queryString from 'query-string';
import { useHistory } from 'react-router-dom'
import PopupModal from '../PopupModal'

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
  const [pictureList, setPictureList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  let textAreaRef = useRef<HTMLAreaElement>(null);
  const postText = useSelector(state => state.postingText);
  
  const dispatch = useDispatch();
  function closeClick() {
    dispatch({type: 'postingMenu/set', payload: false})
  }

  function twitterPost() {
    (async() => {
      
      dispatch({type: 'postingText/set', payload: document.getElementById("postInput").value})
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
          setTwitterLoginStatus(false)
        } else if (res.status == 400) {
          alert("Bad input. (Likely a duplicate tweet, please write something else!)")
        } else {
          setShowSuccess(true);
        }
      } catch (error) {
          console.error(error)
      }
      setButtonDisabled(false)
    })();
    
  }

    
  function instagramPostHandler(event) {

    event.preventDefault();
    textAreaRef.select();
    document.execCommand('copy')
    setShowModal(true);
    // output = pictureList[0]
    // const blob = new Blob([output]);                   // Step 3
    // const fileDownloadUrl = URL.createObjectURL(blob); // Step 4
    // this.setState ({fileDownloadUrl: fileDownloadUrl}, // Step 5
    //   () => {
    //     this.dofileDownload.click();                   // Step 6
    //     URL.revokeObjectURL(fileDownloadUrl);          // Step 7
    //     this.setState({fileDownloadUrl: ""})
    // })
  }


  // History is for clearing the query strings when getting the callback
  let history = useHistory();
  // This checks the status once after the component is rendered

  useEffect(async () => {
    setTwitterLoginStatus(await checkOAuth(history));
  },[])
  
  useEffect(async () => {
    window.setTimeout(function () {
      setButtonDisabled(false);
  },5000)
  },[])

  useEffect(() => {
    if (postText != false) {
      setCharacterCount(postText.length);
    }
  }, [postText])
// combine these use effects?
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



  var visibility = "hide";
  const postingMenuStatus = useSelector(state => state.postingMenu);
  if (postingMenuStatus) {
    visibility = "show";
  }

  function wordCount(e){
    var currentText = e.target.value;
    // var characterCount = currentText.length;
    // setCharacterCount(characterCount);
    // This may be wasteful, temp solution
    dispatch({type: 'postingText/set', payload: currentText})
  }

  

  const returnFileSize = (number) => {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  };

  const handleSubmission = (event) => {
    const files = [...event.target.files];
    setPictureList([]);
    setPictureList((pictureList) => [...pictureList, files]);
  };

  const deleteElement = (nameVal) => {
    setPictureList((pictureList) => [pictureList[0].filter(item => item.name != nameVal)]);
  }

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
    <div id="flyoutMenu" className={visibility}>
      <div className="inputMenu">
        <div style={{display: "flex", flexDirection: "row"}}>
          <b style={{margin: "0", marginLeft: "1rem", marginRight: "1rem", paddingTop: "8px"}}> Search Trusted Resources </b>
          <button className="closeButton" onClick={closeClick}>Close</button>
        </div>
        <div class="gcse-search"></div>
        <hr style={{color: "grey", backgroundColor: "grey", height: 1, margin: 0}}/>
        
        <b style={{ marginBottom: "0", marginLeft: "1rem", marginTop:"1rem"}}> Compose Message </b>
        <textarea id="postInput" type="text" placeholder="Post Message "  ref={(textarea) => textAreaRef = textarea} value = {postText ? postText : ""} onChange={wordCount}></textarea>
        <p style={{margin: "0.2rem", marginLeft: "1rem"}}>{ "Character Count: " + characterCount}</p>
        {/* <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value}),'_blank')}>Tweet</button> */}
        {/* add undo button perhaps */}
        <div style={{display: "flex", flexDirection: "row"}}>
          <button id="postButtonId" className="postButton" disabled={buttonDisabled} onClick={() => twitterLoginStatus ? twitterPost(): twitterLogin(setButtonDisabled)}>{twitterLoginStatus ? "Post to Twitter": "Login to Twitter" }</button>
          <button className="postButton" onClick={() => {twitterLogoutAndUpdateLoginStatus(setTwitterLoginStatus)}}>Logout</button>
        </div>

        <button className="postButton" onClick={instagramPostHandler}>Post to Instagram</button>
        {showModal && <PopupModal
          content={<>
            <b>Copied Post to Clipboard</b>
            <p>Follow these 3 steps on Instagram: </p>
            <ol>
              <li>Click on + in the header menu</li>
              <li>Select relevant images</li>
              <li>Paste the caption</li>
            </ol>
            <button onClick={() => window.open('https://instagram.com','_blank')}> Continue to Instagram </button>
          </>}
          handleClose={() => {setShowModal(!showModal);}}
        />}

        {showSuccess && <PopupModal
          content={<>
            <b>Successfully posted to Twitter!</b>
          </>}
          handleClose={() => {setShowSuccess(!showSuccess);}}
        />}
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
}

export default PostingMenu;