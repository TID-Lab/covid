// Followed https://www.cluemediator.com/create-simple-popup-in-reactjs
import { Dialog } from '@headlessui/react';
import c from './index.module.css';
import { ReactNode } from 'react';
import Icon from 'components/Icon';
import Button from 'components/Button';

interface PopupProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: (param: any) => void;
  className?: string;
  title?: string;
}
const PopupModal = ({
  children,
  isOpen,
  onClose,
  className,
  title,
}: PopupProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <Dialog.Panel className={` `}>
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          aria-hidden="true"
          onClick={onClose}
        />
        <div className={`fixed inset-0   grid place-items-center`}>
          <article
            className={`relative px-4 py-5 bg-white rounded-sm  max-w-[70vw]  max-h-[95vh] drop-shadow-lg ${className}`}
          >
            <header className="flex justify-between items-center">
              <h1 className="font-bold pl-6 text-md">{title}</h1>
              <Button variant="transparent" onClick={onClose}>
                <Icon type="x" />
              </Button>
            </header>

            {children}
          </article>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default PopupModal;
