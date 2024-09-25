import axios from "axios";
import { GetToken } from '../StorageToken';

const axiosInstant = axios.create({
  baseURL: "https://api.scorp.co/api"
  // baseURL: "https://digitalmining.axiscodingsolutions.com/demo/api/user"
});

// Add a request interceptor
axiosInstant.interceptors.request.use(async config => {
  try {
    const token = await GetToken('token');
    if (token) {
      console.log('Token found:', token);
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  } catch (error) {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Define API request functions
export const get = (api, body) => axiosInstant.get(api, { params: body });
export const post = (api, body) => axiosInstant.post(api, body);
export const postForm = (url, body, options) => axiosInstant.post(url, body, {
  ...options, 
  headers: {
    ...options?.headers,
    'Content-Type': 'multipart/form-data',
  },
});
export const putForm = (url, body, options) => axiosInstant.put(url, body, {
  ...options, 
  headers: {
    ...options?.headers,
    'Content-Type': 'multipart/form-data',
  },
});
export const put = (api, body) => axiosInstant.put(api, body);
export const del = (api, body) => axiosInstant.delete(api, { data: body });
