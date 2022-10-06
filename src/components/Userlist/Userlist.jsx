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

  // const [showModal, setshowModal] = useState(false);
  // const [modalContent, setModalContent] = useState({
  //   name: '',
  //   photo: '',
  //   position: '',
  //   email: '',
  //   phone: '',
  // });

  // const handleShowModalContent = e => {
  //   if (e.target.href) {
  //     return;
  //   }
  //   console.log('EEEE ', e.currentTarget);
  //   setshowModal(!showModal);
  // };

  // const handleCloseModal = () => {
  //   setshowModal(!showModal);
  // };

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
      {/* {showModal && (
        <Modal onClose={handleCloseModal}>
          <div>Here</div>
        </Modal>
      )} */}
    </>
  );
};

export default Userlist;
