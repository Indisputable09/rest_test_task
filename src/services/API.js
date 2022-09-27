import axios from 'axios';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/users';

export const PER_PAGE = 6;

export async function fetchUsers(page) {
  try {
    const response = await axios.get('', {
      params: {
        page,
        count: PER_PAGE,
      },
    });
    console.log('Response ', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
