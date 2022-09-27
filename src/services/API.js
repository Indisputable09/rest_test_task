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
