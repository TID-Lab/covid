import { useEffect, useState } from 'react';
import { useShowPopup } from 'hooks/popup';
import NewResource from '../NewResource';
import EditResource from '../EditResource';
import Button from 'components/Button';
import { fetchResources, deleteResource } from 'api/resource';

import c from './index.module.css';
import PopupModal from 'components/PopupModal';

const ResourceModal = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // function showEditModal() {
  //   showPopup(<EditResource />);
  // }

  return (
    <div className={`Modal ${c.ResourceModal}`}>
      <h1>Resource Settings</h1>
      <PopupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        className=""
      >
        <NewResource onClose={() => setShowCreateModal(false)} />
      </PopupModal>
      <Button onClick={() => setShowCreateModal(true)} size="md">
        Add A New Resource
      </Button>

      <Button onClick={() => setShowEditModal(true)}>Edit Resources</Button>
      <PopupModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        {/* <EditResource /> */}
      </PopupModal>
    </div>
  );
};

export default ResourceModal;
