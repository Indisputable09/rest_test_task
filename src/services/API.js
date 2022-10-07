import axios from 'axios';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

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
  } catch (error) {}
}

export async function fetchPositions() {
  try {
    const response = await axios.get('positions');
    return response.data.positions;
  } catch (error) {}
}

export async function getToken() {
  try {
    const authToken = await axios.get('token');
    axios.defaults.headers.common['Token'] = authToken.data.token;
  } catch (error) {}
}

export async function getUserById(id) {
  try {
    if (!id) {
      return;
    }
    const user = await axios.get(`users/${id}`);
    console.log('User ', user);
    return user.data.user;
  } catch (error) {
    return error.response.data.success;
  }
}

export async function postUser(credentials = {}) {
  try {
    const formData = new FormData();
    formData.append('name', credentials.name);
    formData.append('email', credentials.email);
    formData.append('phone', credentials.phone);
    formData.append('position_id', credentials.position);
    formData.append('photo', credentials.file);

    const response = await axios.post('users', formData);
    return response;
  } catch (error) {
    return error.response;
  }
}
