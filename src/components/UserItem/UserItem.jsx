import TippyTool from 'components/TippyTool';
import { useUsers } from 'hooks/UsersContext';
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

  return fetchedUsers.map(({ id, name, photo, position, email, phone }) => (
    <UserListItem key={id}>
      <UserCard>
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
    </UserListItem>
  ));
};

export default UserItem;
