import { ShowMoreButton } from 'components/Button/Button.styled';
import UserItem from 'components/UserItem';
import Loader from 'Icons/Loader';
import { UserListGrid, UserListTitle } from './Userlist.styled';

const Userlist = ({ enoughUsers, status, handlePageIncrement }) => {
  return (
    <>
      <UserListTitle>Working with GET request</UserListTitle>
      <UserListGrid>
        <UserItem />
      </UserListGrid>
      {/* <Loader /> */}
      {/* {addingNewInfo && <Loader />} */}
      {status !== 'REJECTED' && enoughUsers && (
        <ShowMoreButton onClick={handlePageIncrement}>
          {status === 'PENDING' ? <Loader /> : 'Show more'}
        </ShowMoreButton>
      )}
    </>
  );
};

export default Userlist;
