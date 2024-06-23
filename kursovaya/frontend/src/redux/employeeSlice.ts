import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

interface Employee {
  employeeId: number;
  name: string;
  address: string;
  phone: string;
  speciality: string;
  imageData: string;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await apiClient.get('/employees');
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: number) => {
  await apiClient.delete(`/employees/${id}`);
  return id;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee: Employee) => {
  const response = await apiClient.put(`/employees/${employee.employeeId}`, employee);
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee.employeeId !== action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;
        state.employees = state.employees.map((employee) =>
          employee.employeeId === updatedEmployee.employeeId ? updatedEmployee : employee
        );
      });
  },
});

export default employeeSlice.reducer;