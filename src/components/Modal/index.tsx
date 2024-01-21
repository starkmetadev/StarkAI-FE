import { useContext, useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";
import ModalContext from "../../utils/modalContext"; // Ensure the path matches case sensitivity

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void; // Define the type based on what onClose does
}

const Modal: FunctionComponent<ModalProps> = ({ children, open, onClose }) => {
  // Use HTMLDialogElement as the type parameter for useRef because we are working with <dialog> element
  const dialog = useRef<HTMLDialogElement>(null);

  const modalCtx = useContext(ModalContext);

  useEffect(() => {
    const modal = dialog.current;
    if (open && modal) {
      modal.showModal();
    }
    return () => {
      if (modal) modal.close();
    };
  }, [open]);

  const handleClose = () => {
    onClose(); // Assuming onClose is meant to be called here
  };

  // Using optional chaining operator in case getElementById returns null
  return createPortal(
    <dialog
      ref={dialog}
      className="modal popup-container"
      onClose={handleClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;