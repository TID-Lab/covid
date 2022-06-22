import Button from 'components/Button';
import { fetchResources } from 'api/resource';
import { useHidePopup } from 'hooks/popup';
import notify from 'util/notify';
import { useEffect, useState, useMemo } from 'react';

import c from './index.module.css';

const EditResource = () => {
  const [resources, setResources] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [authors, setAuthors] = useState();
  const hidePopup = useHidePopup();

  function onAuthorChange(event) {
    setSelectedAuthor(event.target.value);
    formatResources(resources);
  }

  useEffect(() => {
    async function apiCall() {
      const apiResponse = await fetchResources();
      setResources(apiResponse);
      const AUTHORS = ['All'];
      for (let i = 0; i < apiResponse.length; i++) {
        if(!AUTHORS.includes(apiResponse[i].author)) {
          AUTHORS[i + 1] = apiResponse[i].author;
        }
      }
      setAuthors(AUTHORS);
    }
    apiCall();
  }, []);

  function formatResources(r) {
    
    let resourceArray = [];
    let counter = 1;
    for (let i = 0; i < r.length; i++) {
      if (r[i].author === selectedAuthor || selectedAuthor === 'All' 
      || !selectedAuthor) {
        let resourceString = '';
        resourceString += (counter) + '. [';
        resourceString += 'Name: \n' + r[i].name + ', ';
        resourceString += 'Author: \n' + r[i].author + ', ';
        resourceString +=  'Url: \n' + r[i].url;
        resourceString += ']';
        resourceArray[counter - 1] = resourceString;
        counter++;
      }
    }
    const listItems =  resourceArray.map((resource) =>
      <li>{resource}</li>
    );
    return listItems
  }



  function onClose() {
    hidePopup();
  }

  return (
    <div className={`Modal ${c.ResourceModal}`}>
      <div>
        <label>Author: </label>
        <select onChange={onAuthorChange} value={selectedAuthor}>
          {authors && authors.map(selectedAuthor => (
            <option key={selectedAuthor} value={selectedAuthor}>{selectedAuthor.charAt(0).toUpperCase() + selectedAuthor.slice(1)}</option>
          ))}
        </select>
      </div>
      <h4>Items Found: </h4>
      <ul>{resources && formatResources(resources)}</ul>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditResource;