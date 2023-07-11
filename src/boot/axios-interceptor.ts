import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from 'src/stores/auth-store';

const authApi: AxiosInstance = axios.create();

authApi.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.loggedUser && auth.loggedUser.token) {
    config.headers['Authorization'] = `Token ${auth.loggedUser.token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

const nonAuthApi: AxiosInstance = axios.create();

export { authApi, nonAuthApi };
