import axios from 'axios';

const axiosClient = axios.create({
  // baseURL: 'https://api.student-pay.co.uk/api',
  // baseURL: 'https://stagingapi.student-pay.co.uk/api',
  baseURL: 'http://127.0.0.1:8000/api',
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // If the token exists, set it in the Authorization header
    if (token)
    {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // If the response contains a new token, update it in local storage
    const newToken = response.headers['new-access-token'];
    if (newToken) 
    {
      localStorage.setItem('token', newToken);
    }
    return response;
  },
  (error) => {
    // Handle token refresh failure or other errors
    return Promise.reject(error);
  }
);

export default axiosClient;
