// @ts-nocheck
// React hooks for showing & hiding the popup component

import { useAppDispatch } from 'hooks/useTypedRedux';

function useShowPopup() {
  const dispatch = useAppDispatch();

  return (popupModal) => {
    dispatch({ type: 'popup/set', payload: popupModal });
    document.getElementById('Popup').style.display = 'flex';
  };
}

function useHidePopup() {
  const dispatch = useAppDispatch();

  return () => {
    document.getElementById('Popup').style.display = 'none';
    dispatch({ type: 'popup/set', payload: null });
  };
}

export { useShowPopup, useHidePopup };
