import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7114/api',
});

export default apiClient;