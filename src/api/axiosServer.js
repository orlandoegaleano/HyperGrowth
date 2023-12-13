import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosServer = axios.create({
    baseURL: 'https://d4f6-72-200-46-109.ngrok-free.app/'
});

axiosServer.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosServer;
