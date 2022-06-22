import { useEffect, useState } from "react";
import { useShowPopup } from 'hooks/popup';
import NewResource from "../NewResource";
import EditResource from "../EditResource";
import Button from "components/Button";
import { fetchResources, deleteResource } from "api/resource";

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
  function deleteLast() {
    const resources = fetchResources().then((resource)=> {
      return resource;
    });
    const removeResource = async () => {
      const a = await resources;
      deleteResource(a[a.length - 1]);
    }
    removeResource();
  }

  return (
    <div className={`Modal ${c.ResourceModal}`}>
      <h1>Resource Settings</h1>
      <Button onClick={showCreateModal}>Add Resource</Button>
      <Button onClick={showEditModal}>View Resources</Button>
      <Button onClick={deleteLast}>Delete Resource</Button>
    </div>
  );
};

export default ResourceModal;