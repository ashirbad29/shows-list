import Axios from 'axios';

export const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjBjNmE3NDQ1MmJhODcyY2MxN2UxNDA5NDAyMjg3ZSIsInN1YiI6IjYyNmMxNWQ3Yzc0ZWJhMGUyODY3OGJiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVmecv2ali5mCBQrYuh8lGYJ4ob7gVjqRh27l5ErWZg';

const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: API_READ_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
});

export default axios;
