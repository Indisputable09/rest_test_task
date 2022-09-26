import axios from 'axios';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/users';

export async function fetchUsers() {
  try {
    const response = await axios.get('', {
      params: {
        page: 1,
        count: 6,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
