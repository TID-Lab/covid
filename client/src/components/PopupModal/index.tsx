// Followed https://www.cluemediator.com/create-simple-popup-in-reactjs
import { Dialog } from '@headlessui/react';
import c from './index.module.css';
import { ReactNode } from 'react';

interface PopupProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: (param: any) => void;
  className?: string;
}
const PopupModal = ({ children, isOpen, onClose, className }: PopupProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <Dialog.Panel className={`max-w-lg ${className}`}>
        <div className={c.popup_box}>
          <div className={c.box}>
            <span className={c.close_icon} onClick={onClose}>
              x
            </span>

            {children}
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default PopupModal;
