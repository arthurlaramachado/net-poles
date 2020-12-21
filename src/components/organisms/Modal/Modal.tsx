import React from 'react';
import './styles.css';
import Button from '../../atoms/Button/Button';

interface modal {
  handleClose: Function;
  handleConfirm: Function;
  isOpen: Boolean;
}

const Modal: React.FC<modal> = ({ handleClose, handleConfirm, isOpen, children }) => {
  const showHideClassName = isOpen ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className={"actions"}>
          <Button type="button" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button type="button" onClick={handleClose}>
            Close
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Modal;