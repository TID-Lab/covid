import Button from 'components/Button';
import { fetchResources, deleteResource } from 'api/resource';
import { useHidePopup, useShowPopup } from 'hooks/popup';
import notify from 'util/notify';
import { useEffect, useState, useMemo } from 'react';
import EditModal from '../EditModal';

import c from './index.module.css';

const EditResource = () => {
  const [resources, setResources] = useState<any[]>([]);
  const hidePopup = useHidePopup();
  const showPopup = useShowPopup();

  useEffect(() => {
    async function apiCall() {
      const apiResponse = await fetchResources();
      setResources(apiResponse);
    }
    apiCall();
  }, []);

  function onClose() {
    hidePopup();
  }
  function onDelete(url: string) {
    const newResources = [...resources];
    const index = resources.findIndex((resource) => resource.url === url);
    newResources.splice(index, 1);
    const resourceUrl = {
      url: url,
    };
    deleteResource(resourceUrl);
    setResources(newResources);
  }
  function onEdit(url: string) {
    const newResources = [...resources];
    const index = resources.findIndex((resource) => resource.url === url);
    showCreateModal(newResources[index]);

  }
  function showCreateModal(resource: Object) {
    showPopup(
      <EditModal resource={resource}/>
    );
  }
  return (
    <div className={`Modal ${c.ResourceModal}`}>
      <h4>Resources</h4>
      <table className='border-collapse collapse width 100% overflow-x scroll overflow-y scroll'>
            <thead>
              <tr>
                <th className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>Name</th>
                <th className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>Author</th>
                <th className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>Type</th>
                <th className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>URL</th>
                <th className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>Actions</th>
              </tr>
            </thead>
            <tbody>
            {resources && resources.map((resource) => (
                <tr>
                  <td className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>{resource.name}</td>
                  <td className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>{resource.author}</td>
                  <td className='border 1px solid #ffffff text-align left padding 8px font-size 10px'>{resource.type}</td>
                  <td className='border 1px solid #ffffff text-align left padding 8px font-size 10px overflow-x scroll-m-0'>{resource.url}</td>
                  <td className='border 1px solid #ffffff text-align left padding 8px font-size 10px overflow-x scroll-m-0'>
                    <Button onClick={() => onEdit(resource.url)}>Edit</Button>
                    <Button onClick={() => onDelete(resource.url)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
      </table>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditResource;