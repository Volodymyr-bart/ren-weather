import { MouseEvent, ReactNode } from "react";
import "./Modal.css";
interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <div
      className={`modal-backdrop ${isOpen ? "active" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`overlay animated ${isOpen ? "show" : ""}`}>
        <div className="modal">
          <button className="btn-close" onClick={onClose}>
            <svg height="200" viewBox="0 0 200 200" width="200">
              <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
            </svg>
          </button>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
