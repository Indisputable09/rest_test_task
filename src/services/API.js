import axios from 'axios';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const PER_PAGE = 6;

export async function fetchUsers(page) {
  try {
    const response = await axios.get('users', {
      params: {
        page,
        count: PER_PAGE,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPositions() {
  try {
    const response = await axios.get('positions');
    return response.data.positions;
  } catch (error) {
    console.log(error);
  }
}

// export async function getToken() {
//   try {
//     const token = await axios.get('token');
//     return token.data.token;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function postUser(credentials = {}) {
  try {
    const responseToken = await axios.get('token');
    const token = responseToken.data.token;

    console.log('~ token', token);
    const response = await axios.post(
      'users',
      { body: credentials },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log('~ response', response);
  } catch (error) {
    console.log(error);
  }
}
