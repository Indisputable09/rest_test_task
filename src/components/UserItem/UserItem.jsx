import { useUsers } from 'hooks/UsersContext';
import {
  UserListItem,
  UserCard,
  UserItemImg,
  UserItemName,
  UserItemAddInfo,
} from './UserItem.styled';

const UserItem = () => {
  const { fetchedUsers } = useUsers();
  return fetchedUsers.map(({ id, name, photo, position, email, phone }) => (
    <UserListItem key={id}>
      <UserCard>
        <UserItemImg src={photo} alt={name} />
        <UserItemName>{name}</UserItemName>
        <UserItemAddInfo>
          {position} <br />
          {email} <br />
          {phone}
        </UserItemAddInfo>
      </UserCard>
    </UserListItem>
  ));
};

export default UserItem;
