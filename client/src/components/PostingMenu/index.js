/*global FB*/
import './index.css';
import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import { twitterLogin } from '../../api/auth.js'


function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

// async function loginToFacebook() {
//   FB.login(function(response) {
//     if (response.authResponse) {
//       document.getElementById("loginAndPostButtonFB").innerHTML = "Post to Facebook";
//     } else {
//       console.log('User cancelled login or did not fully authorize.');
//       document.getElementById("loginAndPostButtonFB").innerHTML = "Login to Facebook";
//     }
//   });
//   // }, {scope: 'pages_manage_posts, pages_read_engagement'});
// }

// async function onLoadFBButton() {
//   FB.getLoginStatus(function(response) {
//     if (response.status == 'connected') {
//       document.getElementById("loginAndPostButtonFB").innerHTML = "Post to Facebook";
//     } else {
//       console.log('User cancelled login or did not fully authorize.');
//       document.getElementById("loginAndPostButtonFB").innerHTML = "Login to Facebook";
//     }
//   })
// }

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
  // window.fbAsyncInit = function () {
  //             window.FB.init({
  //                 appId: "176818874280010",
  //                 cookie: false,
  //                 xfbml: true,
  //                 version: 'v12.0'
  //             });

  // auto authenticate with the api if already logged in with facebook
  // window.FB.getLoginStatus(({ authResponse }) => {
  //     if (authResponse) {
  //         accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
  //     } else {
  //         resolve();
  //     }
  // });
  // }

  // const logInToFB = useCallback(() => {
  //   window.FB.login((response) => {
  //     setFbUserAccessToken(response.authResponse.accessToken);
  //   }, {scope: });
  // }, []);
  
  const [pictureList, setPictureList] = useState([]);

  const returnFileSize = (number) => {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  };

  const countChars = (e) => {
    const counterEle = document.getElementById('the-count');
    const target = e.target;
    // Get the `maxlength` attribute
    const maxLength = target.getAttribute('maxlength');
    // Count the current number of characters
    const currentLength = target.value.length;
    counterEle.innerHTML = `${currentLength}/${maxLength}`;
  }

  const handleSubmission = (event) => {
    console.log("HELLO!");
    console.log(event.target.files);
    const files = [...event.target.files];
    setPictureList([]);
    setPictureList((pictureList) => [...pictureList, files]);
  };

  const deleteElement = (nameVal) => {
    console.log("In delete Element:");
    console.log(nameVal);
    console.log(typeof(nameVal));
    setPictureList((pictureList) => [pictureList[0].filter(item => item.name != nameVal)]);
  }

  useEffect(() => {
    console.log("pictureList");
    console.log(pictureList);
    
    const preview = document.querySelector('.preview');
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    if (pictureList.length !== 0) {
      const array = document.createElement('ol');
      preview.appendChild(array);

      for (let i = 0; i < pictureList.length; i++) {
        for (let j = 0; j < pictureList[0].length; j++) {
          const listItem = document.createElement('li');
          const paragraph = document.createElement('p');
          const button = document.createElement('button');
          button.id = pictureList[i][j].name;
          button.innerHTML = "DELETE";
          button.style.background = "#FF0000";
          button.onclick = function () { deleteElement(pictureList[i][j].name); }

          paragraph.textContent = `File name ${pictureList[i][j].name}, file size ${returnFileSize(pictureList[i][j].size)}.`;
          //const img = document.createElement('img');
          //img.src = URL.createObjectURL(currentFiles[i]);
          //listItem.appendChild(img);
          listItem.appendChild(paragraph);
          listItem.appendChild(button);
          array.appendChild(listItem);
        }
      }
    }
  });

  return (
    <div id="flyoutMenu" className={visibility}>
      <div className="inputMenu">
        <text>Compose Message</text>
        <textarea id="postInput" type="text" placeholder="Post Message " maxLength="280" onKeyUp={countChars} autofocus></textarea>
        <div id="the-count">
          <span id="current">0</span>
          <span id="maximum">/ 280</span>
        </div>
        {/* <button className="postButton" onClick={() => {FB.ui({method: 'feed', link: 'peach.ipat.gatech.edu'}, function(response){})}}> Post on FB </button> */}
        {/* <button className="postButton" id="loginAndPostButtonFB" onLoad={onLoadFBButton()} onClick={() => {
          window.FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
              FB.api('/me/feed', 'post', { message: document.getElementById("postInput").value }, function(response) {
                if (!response) {
                  alert('Error occurred');
                } else if (response.error) {
                  alert(JSON.stringify(response.error));
                } else {
                  alert('Post ID: ' + response.id);
                }
              });
            } else {
              loginToFacebook();
            }
          })}}> Login to Facebook </button> */}

        {/* <button className="postButton" onClick={() => {FB.api('/me/feed', 'post', { message: document.getElementById("postInput").value }, function(response) {
          if (!response || response.error) {
            alert('Error occurred');
          } else {
            alert('Post ID: ' + response.id);
          }
        });}}>Post to FB</button> */}
        <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value}),'_blank')}>Tweet</button>
        <button className="postButton" onClick={twitterLogin}>Login</button>
        <form method="post" enctype="multipart/form-data">
          <div>
              <div>
                <label for="image_uploads">Insert Image or Video </label>
                <input type="file" id="image_uploads" name="image_uploads" accept="image/*, video/*" onChange={handleSubmission} multiple></input>
                <button> Submit</button>
              </div>
              <div class="preview"> </div>
          </div>
        </form>
        {/* <input type="file"/>*/}
        {/* <a className="blueButton" href="http://localhost:5000/auth/twitter">Login to Twitter</a> */}
        {/* <button className="postButton" onClick={() => window.open("http://localhost:5000/auth/twitter",'_blank')}>Login to Twitter</button> */}
        {/* <text> {authLink.url} </text> */}
        {/* <button className="postButton" onClick={() => window.open('https://twitter.com/intent/tweet?' + encodeQueryData({"text": document.getElementById("postInput").value, "in_reply_to":s }),'_blank')}>Tweet</button> */}
      </div>
    </div>  
  );
}

export default PostingMenu;