import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const axiosInstance = axios.create({
  // baseURL: API_END_POINTS.BASE_URL+AsyncStorage.getItem('dealerNo'),
});
export async function getBaseUrl() {
  const No = await AsyncStorage.getItem('@Melica:api');
  const value = No;
  return value;
}
axiosInstance.defaults.timeout = 10000000;
axiosInstance.interceptors.request.use(
  async config => {
    config.baseURL = await getBaseUrl();
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
export default axiosInstance;
