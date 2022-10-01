import { UserCard } from './UserItem.styled';

const UserItem = ({ fetchedUsers }) => {
  return fetchedUsers.map(({ id, name, photo, position, email, phone }) => (
    <li key={id}>
      <UserCard>
        <img src={photo} alt={name} />
        <p>{name}</p>
        <p>{position}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </UserCard>
    </li>
  ));
};

export default UserItem;
