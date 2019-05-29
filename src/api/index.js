import axios from 'axios';

const API_BASE_URL = 'https://k-questioner.herokuapp.com/api/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
