import axios, { AxiosError } from 'axios';
import Secrets from 'react-native-config';

const ajax = axios.create({
  baseURL: Secrets.BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// Add a request interceptor
ajax.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
ajax.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      //
    }
    return Promise.reject(error);
  },
);
