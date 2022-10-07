import { createRef, useEffect, useState } from 'react';
import { Status, USER_ID_LS } from 'constants/constants';
import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Userlist from 'components/Userlist';
import { fetchUsers, getToken, getUserById, PER_PAGE } from 'services/API';
import Registration from 'components/Registration';
import { UsersContext } from 'hooks/UsersContext';
import { Box } from 'components/Box';
import Container from 'components/Container';
import SuccessImage from 'Icons/SuccessImage';
import Preloader from 'Icons/Preloader';
import { CenteredLoader } from 'Icons/Loader/Loader.styled';
import UpButton from 'components/UpButton';

const showMoreButtonRef = createRef();
const usersRef = createRef();
const signUpRef = createRef();

export const App = () => {
  const { idle, pending, resolved, rejected } = Status;
  const [showPreloader, setShowPreloader] = useState(true);
  const [fetchedUsers, setfetchedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(idle);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showUpButton, setShowUpButton] = useState(false);

  const userId = localStorage.getItem(USER_ID_LS) || null;

  useEffect(() => {
    getToken();
    (async function checkUserId() {
      const userDataResponse = await getUserById(userId);
      if (userDataResponse) {
        console.log('Here');
        setLoggedIn(true);
        setUser(userDataResponse.name);
      } else {
        return;
      }
    })();
    const timeOutId = setTimeout(() => {
      setShowPreloader(false);
    }, 500);
    return () => {
      clearTimeout(timeOutId);
      window.removeEventListener('scroll', handleShowUpButton);
    };
  }, [loggedIn, userId]);

  useEffect(() => {
    (async function asyncFetchUsers() {
      try {
        setStatus(pending);
        const { users } = await fetchUsers(page);
        if (!users ?? users.length === 0) {
          setStatus(idle);
          return;
        }
        setStatus(resolved);
        console.log('~ fetchedUsers', users);
        if (page === 1) {
          console.log('Page 1 and users ', users);
          setfetchedUsers(users);
        } else if (page !== 1) {
          setfetchedUsers(prevUsers => [...prevUsers, ...users]);
          console.log('Page not 1 and users ', users);
        }
        return;
      } catch (error) {
        console.log(error);
        setStatus(rejected);
      }
    })();
  }, [idle, page, pending, rejected, resolved, loggedIn]);

  // useEffect(() => {
  //   if (page !== 1) {
  //     console.log('Page ', page);
  //     return;
  //   }
  //   (async function asyncFetchUsers() {
  //     try {
  //       const { users } = await fetchUsers(page);
  //       if (!users ?? users.length === 0) {
  //         return;
  //       }
  //       setStatus(resolved);
  //       console.log('~ fetchedUsers in second effect', users);
  //       setfetchedUsers(users);
  //       return;
  //     } catch (error) {
  //       console.log(error);
  //       setStatus(rejected);
  //     }
  //   })();
  // }, [page, rejected, resolved, loggedIn]);

  const handlePageIncrement = () => {
    setPage(prevPage => prevPage + 1);
    if (status === 'RESOLVED') {
      setTimeout(() => {
        showMoreButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }, 400);
    }
  };

  const handleSubmitClick = () => {
    setPage(1);
    setLoggedIn(true);
    // if (fetchedUsers.length > 6) {
    setfetchedUsers([]);
    // }
  };

  const handleUpButtonClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleShowUpButton = () => {
    if (window.scrollY > 300) {
      setShowUpButton(true);
      return;
    }
    if (window.scrollY <= 300) {
      setShowUpButton(false);
      return;
    }
  };

  window.addEventListener('scroll', handleShowUpButton);

  const ENOUGH_USERS = fetchedUsers.length % PER_PAGE === 0;
  return (
    <>
      <GlobalStyle />
      <UsersContext.Provider
        value={{
          userName: user,
          fetchedUsers,
          usersRef,
          signUpRef,
          handleSubmitClick,
        }}
      >
        {showPreloader ? (
          <CenteredLoader>
            <Preloader />
          </CenteredLoader>
        ) : (
          <>
            <Header />
            <main>
              <Hero />
              <Box pt="10" textAlign="center">
                <Container>
                  <Userlist
                    showMoreButtonRef={showMoreButtonRef}
                    enoughUsers={ENOUGH_USERS}
                    status={status}
                    handlePageIncrement={handlePageIncrement}
                  />
                </Container>
              </Box>
              {/* {loggedIn && (
                <Box pt="10" textAlign="center">
                  <Container>
                    <Userlist
                      showMoreButtonRef={showMoreButtonRef}
                      enoughUsers={ENOUGH_USERS}
                      status={status}
                      handlePageIncrement={handlePageIncrement}
                    />
                  </Container>
                </Box>
              )} */}
              <Box pt="10" pb="11" textAlign="center">
                <Container>
                  {loggedIn ? <SuccessImage /> : <Registration />}
                </Container>
              </Box>
            </main>
            {showUpButton && (
              <UpButton handleUpButtonClick={handleUpButtonClick} />
            )}
          </>
        )}
      </UsersContext.Provider>
    </>
  );
};
