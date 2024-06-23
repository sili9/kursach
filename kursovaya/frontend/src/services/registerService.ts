import apiClient from '../utils/apiClient';

export const getLogpasses = async () => {
  const response = await apiClient.get('/logpass');
  return response.data;
};

export const getLogpass = async (id: string) => {
  const response = await apiClient.get(`/logpass/${id}`);
  return response.data;
};

export const addLogpass = async (logpass: any) => {
  const response = await apiClient.post('/logpass', logpass);
  return response.data;
};

export const updateLogpass = async (id: string, logpass: any) => {
  const response = await apiClient.put(`/logpass/${id}`, logpass);
  return response.data;
};

export const deleteLogpass = async (id: string) => {
  const response = await apiClient.delete(`/logpass/${id}`);
  return response.data;
};
