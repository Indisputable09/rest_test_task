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
    const postData = {
      name: credentials.name,
      email: credentials.email,
      phone: credentials.phone,
      position_id: credentials.position_id,
      photo: credentials.photo,
    };

    const response = await axios.post('users', postData, {
      headers: {
        Token: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
