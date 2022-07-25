import Button from 'components/Button';
import { createResource } from 'api/resource';
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
  const [imageurl, setImageUrl] = useState('');
  const [topics, setTopics] = useState('');
  


  const hidePopup = useHidePopup();


  function onNameChange(event: any) {
    setName(event.target.value);
  }

  function onAuthorChange(event: any) {
    setAuthor(event.target.value);
  }

  function onUrlChange(event: any) {
    setUrl(event.target.value);
  }

  function onTypeChange(event: any) {
    setType(event.target.value);
  }

  function onImageUrlChange(event: any) {
    setImageUrl(event.target.value);
  }

  function onTopicsChange(event: any) {
    setTopics(event.target.value);
  }

  async function onClick() {
    try {
      var resource = null;
      if (!imageurl){
        resource = await createResource({
          authoredAt,
          fetchedAt,
          author,
          name,
          url,
          type,
          topics
        });
      } else {
        resource = await createResource({
          authoredAt,
          fetchedAt,
          author,
          name,
          url,
          type,
          imageurl,
          topics
        });
      }
      if(resource) {
        hidePopup();
        notify('Resource saved to database.');
        setName('');
        setAuthor('');
        setUrl('');
        setType(TYPES[0]);
      } else {
        notify('An error occurred. Pleas make sure resource has a Name, Author, and URL.');
      }
    } catch (err) {
      notify('An error occurred.');
    }
  }

  function onClose() {
    hidePopup();
  }

  return(
    <div className={`Modal ${c.NewResource}`}>
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
        {type !== 'image' && <input className='ImageURL' type='text' value={imageurl} onChange={onImageUrlChange} placeholder='Image URL'></input>}
      </div>
      <ul>
          Topics:
        <li>
          Vaccines
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          Boosters 
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          Treatments 
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          Variants 
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          Long COVID 
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          Testing 
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          COVID x Diabetes 
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          Georgia 
          <input type='checkbox' value={topics}></input>
        </li>
      </ul>
      <Button className='CreateResourceButton' onClick={onClick}>+ Create Resource</Button>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NewResource;