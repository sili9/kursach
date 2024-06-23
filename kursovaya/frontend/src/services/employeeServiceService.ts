import apiClient from '../utils/apiClient';

interface EmployeeService {
  employeeServiceId: number;
  employeeName: string;
  serviceName: string;
  employeeId: number;
  serviceId: number;
}

export const getEmployeeServices = async (): Promise<EmployeeService[]> => {
  const response = await apiClient.get('/employeeservices');
  return response.data;
};

export const addEmployeeService = async (employeeService: { employeeId: number; serviceId: number }): Promise<EmployeeService> => {
  const response = await apiClient.post('/employeeservices', employeeService);
  return response.data;
};

export const deleteEmployeeService = async (employeeService: { employeeId: number; serviceId: number }): Promise<void> => {
  await apiClient.delete(`/employeeservices/${employeeService.employeeId}/${employeeService.serviceId}`);
};

export const updateEmployeeService = async (employeeService: EmployeeService): Promise<EmployeeService> => {
  const response = await apiClient.put(`/employeeservices/${employeeService.employeeId}/${employeeService.serviceId}`, employeeService);
  return response.data;
};