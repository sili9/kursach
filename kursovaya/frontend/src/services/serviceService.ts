import apiClient from '../utils/apiClient';

export const getServices = async () => {
  const response = await apiClient.get('/services');
  return response.data;
};

export const getService = async (id: string) => {
  const response = await apiClient.get(`/services/${id}`);
  return response.data;
};

export const addService = async (service: any) => {
  const response = await apiClient.post('/services', service);
  return response.data;
};

export const updateService = async (id: string, service: any) => {
  const response = await apiClient.put(`/services/${id}`, service);
  return response.data;
};

export const deleteService = async (id: string) => {
  const response = await apiClient.delete(`/services/${id}`);
  return response.data;
};
