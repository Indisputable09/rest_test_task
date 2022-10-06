// import { useUsers } from 'hooks/UsersContext';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children, showModal, coordinates }) => {
  // const { coordinates } = useUsers();
  // const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, showModal]);

  // const handleOnMouseMove = e => {
  //   setCoordinates({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  // };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay
      onClick={handleBackDropClick}
      showModal={showModal}
      coordinates={coordinates}
    >
      <ModalWindow showModal={showModal} coordinates={coordinates}>
        {children}
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
