import { useEffect, useState } from 'react';
import { Status } from 'constants/constants';
import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Userlist from 'components/Userlist';
import { fetchUsers, getUserById, PER_PAGE, postUser } from 'services/API';
import Registration from 'components/Registration';
import { UsersContext } from 'hooks/UsersContext';
import { Box } from 'components/Box';
import Container from 'components/Container';

export const App = () => {
  const { idle, pending, resolved, rejected } = Status;
  const USER_ID_LS = 'User_ID';
  const [fetchedUsers, setfetchedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(idle);
  const [position, setPosition] = useState(null);
  const [file, setFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem(USER_ID_LS);
    if (userId) {
      setLoggedIn(true);
    }
    if (loggedIn) {
      (async function asyncFetchUsers() {
        try {
          setStatus(pending);
          const { users } = await fetchUsers(page);
          const { name } = await getUserById(userId);
          setUser(name);
          if (!users ?? users.length === 0) {
            setStatus(idle);
            return;
          }
          setStatus(resolved);
          console.log('~ fetchedUsers', users);
          setfetchedUsers(prevUsers => [...prevUsers, ...users]);
          return;
        } catch (error) {
          console.log(error);
          setStatus(rejected);
        }
      })();
    }
  }, [idle, loggedIn, page, pending, rejected, resolved]);

  const handlePageIncrement = () => {
    setPage(prevPage => prevPage + 1);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 700);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const values = {
      name,
      email,
      phone,
      position_id: position,
      photo: file,
    };
    const postResponse = await postUser(values);
    console.log('~ postResponse', postResponse);
    if (postResponse.success) {
      setLoggedIn(true);
      localStorage.setItem(USER_ID_LS, postResponse.user_id);
    }
  };

  // const handleFileChange = e => {
  //   if (e.target.files.length > 0) {
  //     setFile(e.target.files[0]);
  //   }
  //   const reader = new FileReader();

  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = e => {
  //     const image = new Image();
  //     image.src = e.target.result;
  //     image.onload = e => {
  //       const height = e.target.height;
  //       const width = e.target.width;
  //       if (height > 70 || width > 70) {
  //         alert('Height and Width must not exceed 70px.');
  //         return false;
  //       }
  //       // alert('Uploaded image has valid Height and Width.');
  //       return true;
  //     };
  //   };
  // };

  const validateSelectedFile = () => {
    const MAX_FILE_SIZE = 5120;

    const fileSizeKiloBytes = file.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      alert('File size is greater than maximum limit');
      return;
    }
  };

  const getPosition = pos => {
    setPosition(pos);
  };

  const getFile = uploadedFile => {
    setFile(uploadedFile);
  };

  const ENOUGH_USERS = fetchedUsers.length % PER_PAGE === 0;
  return (
    <>
      <GlobalStyle />
      <UsersContext.Provider
        value={{
          userName: user,
          getPosition,
          fetchedUsers,
        }}
      >
        {/* {status === 'PENDING' ? (
          <Loader />
        ) : (
          <> */}
        <Header />
        {/* <Loader /> */}
        <main>
          <Hero />
          {loggedIn && (
            <Box py="10" textAlign="center">
              <Container>
                <Userlist
                  enoughUsers={ENOUGH_USERS}
                  status={status}
                  handlePageIncrement={handlePageIncrement}
                />
              </Container>
            </Box>
          )}
          <Box pb="11" textAlign="center">
            <Container>
              <Registration
                handleSubmit={handleSubmit}
                getFile={getFile}
                validateSelectedFile={validateSelectedFile}
              />
            </Container>
          </Box>
        </main>
        {/* </> */}
        {/* )} */}
      </UsersContext.Provider>
    </>
  );
};
