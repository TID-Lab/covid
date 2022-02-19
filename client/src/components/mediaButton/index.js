import React, {useState} from 'react';

function MediaButton(){
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {

  };

  return (
    <div>
      <input type='file' name='file' onChange={changeHandler}/>
      {isFilePicked ? (
        <div>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            last modified Date:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (<p> Select a File to show details </p>)}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  )
}

export default MediaButton;