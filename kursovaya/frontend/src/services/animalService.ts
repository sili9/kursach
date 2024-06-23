import apiClient from '../utils/apiClient';

export const getAnimals = async () => {
  const response = await apiClient.get('/animals');
  return response.data;
};

export const getAnimal = async (id: string) => {
  const response = await apiClient.get(`/animals/${id}`);
  return response.data;
};

export const addAnimal = async (animal: any) => {
  const response = await apiClient.post('/animals', animal);
  return response.data;
};

export const updateAnimal = async (id: string, animal: any) => {
  const response = await apiClient.put(`/animals/${id}`, animal);
  return response.data;
};

export const deleteAnimal = async (id: string) => {
  const response = await apiClient.delete(`/animals/${id}`);
  return response.data;
};
