import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

export interface EmployeeService {
  employeeServiceId: number;
  employeeName: string;
  serviceName: string;
  employeeId: number;
  serviceId: number;
}

interface EmployeeServiceState {
  employeeServices: EmployeeService[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeServiceState = {
  employeeServices: [],
  loading: false,
  error: null
};

export const fetchEmployeeServices = createAsyncThunk('employeeServices/fetchEmployeeServices', async () => {
  const response = await apiClient.get('/employeeservices');
  return response.data;
});

export const addEmployeeServiceAsync = createAsyncThunk('employeeServices/addEmployeeService', async (employeeService: { employeeId: number; serviceId: number }) => {
  const response = await apiClient.post('/employeeservices', employeeService);
  return response.data;
});

export const updateEmployeeServiceAsync = createAsyncThunk('employeeServices/updateEmployeeService', async (employeeService: EmployeeService) => {
  const response = await apiClient.put(`/employeeservices/${employeeService.employeeId}/${employeeService.serviceId}`, employeeService);
  return response.data;
});

export const deleteEmployeeServiceAsync = createAsyncThunk('employeeServices/deleteEmployeeService', async (employeeService: { employeeId: number; serviceId: number }) => {
  await apiClient.delete(`/employeeservices/${employeeService.employeeId}/${employeeService.serviceId}`);
  return employeeService;
});

export const fetchEmployees = createAsyncThunk('employeeServices/fetchEmployees', async () => {
  const response = await apiClient.get('/employees');
  return response.data;
});

export const fetchServices = createAsyncThunk('employeeServices/fetchServices', async () => {
  const response = await apiClient.get('/services');
  return response.data;
});

const employeeServiceSlice = createSlice({
  name: 'employeeServices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeServices.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeServices = action.payload;
      })
      .addCase(fetchEmployeeServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employee services';
      })
      .addCase(addEmployeeServiceAsync.fulfilled, (state, action) => {
        state.employeeServices.push(action.payload);
      })
      .addCase(updateEmployeeServiceAsync.fulfilled, (state, action) => {
        const updatedService = action.payload;
        state.employeeServices = state.employeeServices.map((service) =>
          service.employeeServiceId === updatedService.employeeServiceId ? updatedService : service
        );
      })
      .addCase(deleteEmployeeServiceAsync.fulfilled, (state, action) => {
        state.employeeServices = state.employeeServices.filter(
          (employeeService) =>
            !(
              employeeService.employeeId === action.payload.employeeId &&
              employeeService.serviceId === action.payload.serviceId
            )
        );
      });
  }
});

export default employeeServiceSlice.reducer;