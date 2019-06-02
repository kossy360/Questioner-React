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

export const getAllMeetups = token => client.get('/meetups', { headers: { 'x-access-token': token } });

export const getSingleMeetup = (id, token) => client.get(`/meetups/${id}`, { headers: { 'x-access-token': token } });

export const getQuestions = (id, token) => client.get(`/questions/${id}`, { headers: { 'x-access-token': token } });

export const createQuestion = (body, token) => client.post('/questions', body, { headers: { 'x-access-token': token } });

export const getComments = (id, token) => client.get(`/comments/${id}`, { headers: { 'x-access-token': token } });

export const createComment = (body, token) => client.post('/comments', body, { headers: { 'x-access-token': token } });
