import { useUsers } from 'hooks/UsersContext';
import { UserListItem } from './UserItem.styled';
import UserListItemCard from 'components/UserListItemCard';

const UserItem = ({ handleShowModalContent, debouncedHandleCoordinates }) => {
  const { fetchedUsers } = useUsers();

  return fetchedUsers.map(({ id, name, photo, position, email, phone }) => (
    <UserListItem key={id}>
      <UserListItemCard
        photoSrc={photo}
        userName={name}
        userPosition={position}
        userEmail={email}
        userPhone={phone}
        onMouseOver={debouncedHandleCoordinates}
        onClick={e => {
          handleShowModalContent(e, id);
        }}
      />
    </UserListItem>
  ));
};

export default UserItem;
