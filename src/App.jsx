import { useEffect, useState } from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Userlist from 'components/Userlist';
import { fetchUsers } from 'services/API';

export const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function fetchTestData() {
      try {
        const { users } = await fetchUsers();
        console.log('~ users', users);
        setUsers(users);
        return;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero />
        <Userlist users={users} />
      </main>
    </>
  );
};
