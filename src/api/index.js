import axios from 'axios';

const API_BASE_URL = 'https://k-questioner.herokuapp.com/api/v1';

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = userData => client.post('/auth/signup', userData);
export const signIn = userData => client.post('/auth/login', userData);
