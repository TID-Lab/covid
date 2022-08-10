import c from './index.module.css';
import Button from 'components/Button';
import { useState } from 'react';
import PopupModal from 'components/PopupModal';
import Icon from 'components/Icon';
import NewResource from './NewResource';
import EditResource from './EditResource';

const ResourceSettings = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeResource, setActiveResource] = useState<any>(null);

  function onNewResourceOpen() {
    setActiveResource(null);
    setShowCreateModal(true);
  }
  function onNewResourceClose() {
    setActiveResource(null);
    setShowCreateModal(false);
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-slate-700 mb-2">
          Manage Resources
        </h2>

        <Button onClick={onNewResourceOpen} size="md" className="w-fit mb-6">
          <Icon type="plus" />
          Add A New Resource
        </Button>
      </div>

      <EditResource
        onEditOpen={setShowCreateModal}
        setActiveResource={setActiveResource}
      />

      <PopupModal
        isOpen={showCreateModal}
        onClose={onNewResourceClose}
        className=""
        title={activeResource ? 'Edit Resource' : 'Create New Resource'}
      >
        <NewResource onClose={onNewResourceClose} resource={activeResource} />
      </PopupModal>
    </>
  );
};

export default ResourceSettings;
