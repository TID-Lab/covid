// @ts-nocheck
// Followed https://www.cluemediator.com/create-simple-popup-in-reactjs
import React from 'react';
import c from './index.module.css';

const Popup = (props) => {
  return (
    <div className={c.popup_box}>
      <div className={c.box}>
        <span className={c.close_icon} onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
