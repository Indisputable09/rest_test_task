import { createRef, useEffect, useState } from 'react';
import { Status, USER_ID_LS } from 'constants/constants';
import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Userlist from 'components/Userlist';
import { fetchUsers, getUserById, PER_PAGE } from 'services/API';
import Registration from 'components/Registration';
import { UsersContext } from 'hooks/UsersContext';
import { Box } from 'components/Box';
import Container from 'components/Container';
import SuccessImage from 'Icons/SuccessImage';
import Preloader from 'Icons/Preloader';
import { CenteredLoader } from 'Icons/Loader/Loader.styled';

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

  const userId = localStorage.getItem(USER_ID_LS);

  useEffect(() => {
    async function fetchCurrentUserData() {
      const { name } = await getUserById(userId);
      setUser(name);
    }
    if (loggedIn) {
      fetchCurrentUserData();
    }
    const timeOutId = setTimeout(() => {
      setShowPreloader(false);
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [loggedIn, userId]);

  useEffect(() => {
    if (userId) {
      setLoggedIn(true);
    }
    if (loggedIn) {
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
          setfetchedUsers(prevUsers => [...prevUsers, ...users]);
          return;
        } catch (error) {
          console.log(error);
          setStatus(rejected);
        }
      })();
    }
  }, [idle, loggedIn, page, pending, rejected, resolved, userId]);

  const handlePageIncrement = () => {
    setPage(prevPage => prevPage + 1);
    if (status === 'RESOLVED') {
      setTimeout(() => {
        showMoreButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  const setUserLoggedIn = () => {
    setLoggedIn(true);
  };

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
              {loggedIn && (
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
              )}
              <Box pt="10" pb="11" textAlign="center">
                <Container>
                  {loggedIn ? (
                    <SuccessImage />
                  ) : (
                    <Registration setUserLoggedIn={setUserLoggedIn} />
                  )}
                </Container>
              </Box>
            </main>
          </>
        )}
      </UsersContext.Provider>
    </>
  );
};
