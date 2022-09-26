const Userlist = ({ users }) => {
  return users.map(user => <li key={user.id}>{user.id}</li>);
};

export default Userlist;
