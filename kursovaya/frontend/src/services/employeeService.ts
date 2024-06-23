import apiClient from '../utils/apiClient';

export const getEmployees = async () => {
  const response = await apiClient.get('/employees');
  return response.data;
};

export const getEmployee = async (id: string) => {
  const response = await apiClient.get(`/employees/${id}`);
  return response.data;
};

export const addEmployee = async (employee: any) => {
  const response = await apiClient.post('/employees', employee);
  return response.data;
};

export const updateEmployee = async (id: string, employee: any) => {
  const response = await apiClient.put(`/employees/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await apiClient.delete(`/employees/${id}`);
  return response.data;
};
