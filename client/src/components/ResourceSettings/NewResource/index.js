import Button from "components/Button";
import { createResource } from "api/resource";
import { useHidePopup } from 'hooks/popup';
import notify from 'util/notify';
import { useState } from 'react';

import c from './index.module.css';

const TYPES = ['website', 'video', 'pdf', 'image'];

const NewResource = () => {
  const authoredAt = Date.now();
  const fetchedAt = Date.now();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState(TYPES[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [topics, setTopics] = useState('');
  


  const hidePopup = useHidePopup();


  function onNameChange(event) {
    setName(event.target.value);
  }

  function onAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function onUrlChange(event) {
    setUrl(event.target.value);
  }

  function onTypeChange(event) {
    setType(event.target.value);
  }

  function onImageUrlChange(event) {
    setImageUrl(event.target.value);
  }

  function onTopicsChange(event) {
    setTopics(event.target.value);
  }

  function onClick() {
    try {
      if (!imageUrl){
        createResource({
          authoredAt,
          fetchedAt,
          author,
          name,
          url,
          type,
          topics
        });
      } else {
        createResource({
          authoredAt,
          fetchedAt,
          author,
          name,
          url,
          type,
          imageUrl
        });
      }
      

      hidePopup();
      notify('Resource saved to database.');

      setName('');
      setAuthor('');
      setUrl('');
      setType(TYPES[0]);

    } catch (err) {
      notify('An error occurred.');
    }
  }

  function onClose() {
    hidePopup();
  }

  return(
    <div className={`Modal ${c.NewOrganization}`}>
      <h1>New Resource</h1>
      <div>
        <label>Type: </label>
        <select onChange={onTypeChange} value={type}>
          {TYPES.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Name: </label>
        <input className='Name' type='text' value={name} onChange={onNameChange} placeholder='Name'></input>
      </div>
      <div>
        <label>Author: </label>
        <input className='Author' type='text' value={author} onChange={onAuthorChange} placeholder='Author'></input>
      </div>
      <div>
        <label>URL: </label>
        <input className='URL' type='text' value={url} onChange={onUrlChange} placeholder='URL'></input>
      </div>
      <div>
        {type !== 'image' && <p>Image URL: </p>}
        {type !== 'image' && <input className='ImageURL' type='text' value={imageUrl} onChange={onImageUrlChange} placeholder='Image URL'></input>}
      </div>
      <ul>
        <p1>Topics: </p1>
        <li>
          <p1>Vaccines</p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Boosters</p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Treatments</p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Variants</p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Long COVID</p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Testing</p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>COVID x Diabetes</p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Georgia</p1>
          <input type='checkbox' value={topics}></input>
        </li>
      </ul>
      <Button className='createResourceButton' onClick={onClick}>+ Create Resource</Button>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NewResource;