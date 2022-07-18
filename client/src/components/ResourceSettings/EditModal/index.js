import Button from 'components/Button';
import { createResource, deleteResource } from 'api/resource';
import { useHidePopup } from 'hooks/popup';
import notify from 'util/notify';
import { useState } from 'react';

import c from './index.module.css';

const TYPES = ['website', 'video', 'pdf', 'image'];

const EditModal = (props) => {
  const authoredAt = Date.now();
  const fetchedAt = Date.now();
  console.log(props.resource.name);
  const [name, setName] = useState(props.resource.name);
  const [author, setAuthor] = useState(props.resource.author);
  const [url, setUrl] = useState(props.resource.url);
  const [type, setType] = useState(props.resource.type);
  const [imageurl, setImageUrl] = useState('');
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
      const resourceUrl = {
        url: props.resource.url,
      };
      deleteResource(resourceUrl);
      var resource = null;
      if (!imageurl){
        resource = createResource({
          authoredAt,
          fetchedAt,
          author,
          name,
          url,
          type,
          topics
        });
      } else {
        resource = createResource({
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
      if (resource != null) {
        hidePopup();
        notify('Changes have been saved to resource.');

        setName('');
        setAuthor('');
        setUrl('');
        setType(TYPES[0]);
      }

    } catch (err) {
      notify('An error occurred.');
    }
  }

  function onClose() {
    hidePopup();
  }

  return(
    <div className={`Modal ${c.EditModal}`}>
      <h1>Edit Resource</h1>
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
        <p1>Topics: </p1>
        <li>
          <p1>Vaccines </p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Boosters </p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Treatments </p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Variants </p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Long COVID </p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Testing </p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>COVID x Diabetes </p1>
          <input type='checkbox' value={topics}></input>
        </li>
        <li>
          <p1>Georgia </p1>
          <input type='checkbox' value={topics}></input>
        </li>
      </ul>
      <Button className='CreateResourceButton' onClick={onClick}>Save Changes</Button>
      <div>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditModal;