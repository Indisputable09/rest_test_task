const UserItem = ({ fetchedUsers }) => {
  return fetchedUsers.map(({ id, name, photo, position, email, phone }) => (
    <li key={id}>
      <img src={photo} alt={name} />
      <p>{name}</p>
      <p>{position}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </li>
  ));
};

export default UserItem;
