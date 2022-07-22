// @ts-nocheck
// Followed https://www.cluemediator.com/create-simple-popup-in-reactjs
import { Dialog } from '@headlessui/react';
import c from './index.module.css';

const Popup = (props) => {
  return (
    <Dialog.Panel className="max-w-lg mx-auto">
      <div className={c.popup_box}>
        <div className={c.box}>
          <span className={c.close_icon} onClick={props.handleClose}>
            x
          </span>

          {props.content}
        </div>
      </div>

      {/* ... */}
    </Dialog.Panel>
  );
};

export default Popup;
