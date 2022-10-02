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

export async function getToken() {
  try {
    const token = await axios.get('token');
    return token.data.token;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(id) {
  try {
    const token = await getToken();
    const user = await axios.get(`users/${id}`, {
      headers: {
        Token: token,
      },
    });
    console.log('User ', user);
    return user.data.user;
  } catch (error) {
    console.log(error);
  }
}

export async function postUser(credentials = {}) {
  try {
    const token = await getToken();
    const formData = new FormData();
    formData.append('name', credentials.name);
    formData.append('email', credentials.email);
    formData.append('phone', credentials.phone);
    formData.append('position_id', credentials.position);
    formData.append('photo', credentials.file);

    const response = await axios.post('users', formData, {
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
