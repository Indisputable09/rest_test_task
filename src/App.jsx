import { useEffect, useState } from 'react';
import { Status } from 'constants/constants';
import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Userlist from 'components/Userlist';
import { fetchUsers, PER_PAGE } from 'services/API';
import UserItem from 'components/UserItem';
import { ShowMoreButton } from 'components/Button/Button.styled';
import Registration from 'components/Registration';

export const App = () => {
  const { idle, pending, resolved, rejected } = Status;
  const [fetchedUsers, setfetchedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(idle);
  const [position, setPosition] = useState('');

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

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const chosenPosition = position;
    const values = {
      name,
      email,
      phone,
      chosenPosition,
    };
    console.log('values ', values);
  };

  const getPosition = pos => {
    console.log('pos ', pos);
    setPosition(pos);
  };

  const ENOUGH_USERS = fetchedUsers.length % PER_PAGE === 0;
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero />
        <Userlist>
          <h2>Working with GET request</h2>
          <UserItem fetchedUsers={fetchedUsers} />
          {status === 'RESOLVED' && ENOUGH_USERS && (
            <ShowMoreButton onClick={handlePageIncrement}>
              Show more
            </ShowMoreButton>
          )}
        </Userlist>
        <Registration onSubmit={handleSubmit} getPosition={getPosition} />
      </main>
    </>
  );
};
