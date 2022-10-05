import { ShowMoreButton } from 'components/Button/Button.styled';
import UserItem from 'components/UserItem';
import { useUsers } from 'hooks/UsersContext';
import Loader from 'Icons/Loader';
import { UserListGrid, UserListTitle } from './Userlist.styled';

const Userlist = ({
  enoughUsers,
  status,
  handlePageIncrement,
  showMoreButtonRef,
}) => {
  const { usersRef } = useUsers();
  return (
    <>
      <UserListTitle ref={usersRef}>Working with GET request</UserListTitle>
      <UserListGrid>
        <UserItem />
      </UserListGrid>
      {status !== 'REJECTED' && enoughUsers && (
        <ShowMoreButton ref={showMoreButtonRef} onClick={handlePageIncrement}>
          {status === 'PENDING' ? <Loader /> : 'Show more'}
        </ShowMoreButton>
      )}
    </>
  );
};

export default Userlist;
