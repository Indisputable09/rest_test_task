import { useEffect, useState } from 'react';
import { Status } from 'constants/constants';
import { GlobalStyle } from 'components/GlobalStyle';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Userlist from 'components/Userlist';
import { fetchUsers, PER_PAGE, postUser } from 'services/API';
import UserItem from 'components/UserItem';
import { ShowMoreButton } from 'components/Button/Button.styled';
import Registration from 'components/Registration';

export const App = () => {
  const { idle, pending, resolved, rejected } = Status;
  const [fetchedUsers, setfetchedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(idle);
  const [position, setPosition] = useState('');
  const [file, setFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
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
  }, [idle, loggedIn, page, pending, rejected, resolved]);

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
    if (postResponse.success) {
      setLoggedIn(true);
    }
  };

  const handleFileChange = e => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log('~ e.target.files[0]', e.target.files[0]);
    }
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = e => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = e => {
        const height = e.target.height;
        const width = e.target.width;
        if (height > 70 || width > 70) {
          alert('Height and Width must not exceed 70px.');
          return false;
        }
        // alert('Uploaded image has valid Height and Width.');
        return true;
      };
    };
  };

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

  const ENOUGH_USERS = fetchedUsers.length % PER_PAGE === 0;
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Hero />
        {loggedIn && (
          <Userlist>
            <h2>Working with GET request</h2>
            <UserItem fetchedUsers={fetchedUsers} />
            {status === 'RESOLVED' && ENOUGH_USERS && (
              <ShowMoreButton onClick={handlePageIncrement}>
                Show more
              </ShowMoreButton>
            )}
          </Userlist>
        )}
        <Registration
          onSubmit={handleSubmit}
          getPosition={getPosition}
          handleFileChange={handleFileChange}
          validateSelectedFile={validateSelectedFile}
        />
      </main>
    </>
  );
};
