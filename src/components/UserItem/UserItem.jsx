import debounce from 'lodash.debounce';
import Modal from 'components/Modal';
import TippyTool from 'components/TippyTool';
import { useUsers } from 'hooks/UsersContext';
import { useEffect, useState, useMemo } from 'react';
import { getUserById } from 'services/API';
import sprite from '../../images/svg/sprite.svg';
import {
  UserListItem,
  UserCard,
  UserItemImg,
  UserItemName,
  UserItemAddInfo,
} from './UserItem.styled';

const UserItem = () => {
  const { fetchedUsers } = useUsers();
  const [showModal, setshowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: '',
    photo: '',
    position: '',
    email: '',
    phone: '',
  });
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

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

  return fetchedUsers.map(({ id, name, photo, position, email, phone }) => (
    <UserListItem key={id}>
      <UserCard
        onMouseOver={debouncedHandleCoordinates}
        onClick={e => {
          handleShowModalContent(e, id);
        }}
      >
        {photo.includes('users') ? (
          <UserItemImg src={photo} alt={name} />
        ) : (
          <svg width="70" height="70">
            <use href={sprite + '#user-plug'}></use>
          </svg>
        )}
        <UserItemName>{name}</UserItemName>
        <UserItemAddInfo>
          {position} <br />
          <TippyTool description={email}>
            <a href={`mailto:${email}`}>{email}</a>
          </TippyTool>
          <br />
          <TippyTool description={phone}>
            <a href={`tel:${phone}`}>{phone}</a>
          </TippyTool>
        </UserItemAddInfo>
      </UserCard>
      {/* ------------------------------------------- */}
      {/* {showModal && ( */}
      <Modal
        onClose={handleCloseModal}
        showModal={showModal}
        coordinates={coordinates}
      >
        <UserCard>
          {modalContent.photo.includes('users') ? (
            <UserItemImg src={modalContent.photo} alt={modalContent.name} />
          ) : (
            <svg width="70" height="70">
              <use href={sprite + '#user-plug'}></use>
            </svg>
          )}
          <UserItemName>{modalContent.name}</UserItemName>
          <UserItemAddInfo>
            {modalContent.position} <br />
            <TippyTool description={modalContent.email}>
              <a href={`mailto:${modalContent.email}`}>{modalContent.email}</a>
            </TippyTool>
            <br />
            <TippyTool description={modalContent.phone}>
              <a href={`tel:${modalContent.phone}`}>{modalContent.phone}</a>
            </TippyTool>
          </UserItemAddInfo>
        </UserCard>
      </Modal>
      {/* )} */}
    </UserListItem>
  ));
};

export default UserItem;
