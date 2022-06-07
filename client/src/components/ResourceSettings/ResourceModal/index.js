import { useEffect, useState } from "react";
import { useShowPopup } from 'hooks/popup';
import NewResource from "../NewResource";
import Button from "components/Button";

import c from './index.module.css';

const ResourceModal = () => {
  const showPopup = useShowPopup();

  function showCreateModal() {
    showPopup(
      <NewResource/>
    );
  }

  function showDeleteModal() {
    showPopup(

    );
  }

  return (
    <div className={`Modal ${c.ResourceModal}`}>
      <h1>Resource Settings</h1>
      <Button onClick={showCreateModal}>+ Add Resource</Button>
    </div>
  );
};

export default ResourceModal;