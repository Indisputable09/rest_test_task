import { useEffect, useState } from 'react';
import { Status } from 'constants/constants';
import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Userlist from 'components/Userlist';
import { fetchUsers, PER_PAGE } from 'services/API';
import UserItem from 'components/UserItem';
import { ShowMoreButton } from 'components/Button/Button.styled';

export const App = () => {
  const { idle, pending, resolved, rejected } = Status;
  const [fetchedUsers, setfetchedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(idle);

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
        setfetchedUsers(prevUsers => [...prevUsers, ...users]);
        return;
      } catch (error) {
        console.log(error);
        setStatus(rejected);
      }
    })();
  }, [idle, page, pending, rejected, resolved]);

  const handlePageIncrement = () => {
    setPage(prevPage => prevPage + 1);
    console.log('Button clicked');
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const ENOUGH_USERS = fetchedUsers.length % PER_PAGE === 0;
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero />
        <Userlist>
          <UserItem fetchedUsers={fetchedUsers} />
          {status === 'RESOLVED' && ENOUGH_USERS && (
            <ShowMoreButton onClick={handlePageIncrement}>
              Show more
            </ShowMoreButton>
          )}
        </Userlist>
      </main>
    </>
  );
};
