import { useEffect, useState } from 'react';
import { useShowPopup } from 'hooks/popup';
import NewResource from '../NewResource';
import EditResource from '../EditResource';
import Button from 'components/Button';
import { fetchResources, deleteResource } from 'api/resource';

import c from './index.module.css';

const ResourceModal = () => {
  const showPopup = useShowPopup();

  function showCreateModal() {
    showPopup(
      <NewResource/>
    );
  }
  function showEditModal() {
    showPopup(
      <EditResource/>
    );
  }

  return (
    <div className={`Modal ${c.ResourceModal}`}>
      <h1>Resource Settings</h1>
      <Button onClick={showCreateModal} style={{marginLeft: '0.5rem', marginRight: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem', maxHeight: '3rem'}}>Add Resource</Button>
      <Button onClick={showEditModal} style={{marginLeft: '0.5rem', marginRight: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem', maxHeight: '3rem'}}>Edit Resources</Button>
    </div>
  );
};

export default ResourceModal;