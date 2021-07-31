// React hooks for showing & hiding the popup component

import { useDispatch } from "react-redux";

function useShowPopup() {
  const dispatch = useDispatch();

  return (popupModal) => {
    dispatch({ type: 'popup/set', payload: popupModal });
    document.getElementById('Popup').style.display = 'flex';
  };
}

function useHidePopup() {
  const dispatch = useDispatch();

  return () => {
    document.getElementById('Popup').style.display = 'none';
    dispatch({ type: 'popup/set', payload: null });
  };
}


export { useShowPopup, useHidePopup };