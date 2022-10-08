import debounce from 'lodash.debounce';
import { ShowMoreButton } from 'components/Button/Button.styled';
import Modal from 'components/Modal';
import UserItem from 'components/UserItem';
import { useUsers } from 'hooks/UsersContext';
import Loader from 'Icons/Loader';
import { useEffect, useMemo, useState } from 'react';
import { getUserById } from 'services/API';
import { UserListGrid, UserListTitle } from './Userlist.styled';
import UserListItemCard from 'components/UserListItemCard';

const Userlist = ({
  enoughUsers,
  status,
  handlePageIncrement,
  showMoreButtonRef,
}) => {
  const { usersRef } = useUsers();
  const [showModal, setshowModal] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [modalContent, setModalContent] = useState({
    name: '',
    photo: '',
    position: '',
    email: '',
    phone: '',
  });

  const handleCoordinates = e => {
    setCoordinates({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
  };

  const debouncedHandleCoordinates = useMemo(
    () => debounce(handleCoordinates, 100),
    []
  );

  useEffect(() => {
    return () => {
      debouncedHandleCoordinates.cancel();
    };
  }, [debouncedHandleCoordinates]);

  const handleShowModalContent = async (e, userId) => {
    if (e.target.href) {
      return;
    }

    const { name, photo, position, email, phone } = await getUserById(userId);
    setModalContent({
      name,
      photo,
      position,
      email,
      phone,
    });
    setshowModal(!showModal);
  };

  const handleCloseModal = () => {
    setshowModal(!showModal);
  };

  return (
    <>
      <UserListTitle ref={usersRef}>Working with GET request</UserListTitle>
      <UserListGrid>
        <UserItem
          handleShowModalContent={handleShowModalContent}
          debouncedHandleCoordinates={debouncedHandleCoordinates}
        />
      </UserListGrid>
      {status !== 'REJECTED' && enoughUsers && (
        <ShowMoreButton ref={showMoreButtonRef} onClick={handlePageIncrement}>
          {status === 'PENDING' ? <Loader /> : 'Show more'}
        </ShowMoreButton>
      )}
      <Modal
        onClose={handleCloseModal}
        showModal={showModal}
        coordinates={coordinates}
      >
        <UserListItemCard
          photoSrc={modalContent.photo}
          userName={modalContent.name}
          userPosition={modalContent.position}
          userEmail={modalContent.email}
          userPhone={modalContent.phone}
        />
      </Modal>
    </>
  );
};

export default Userlist;
