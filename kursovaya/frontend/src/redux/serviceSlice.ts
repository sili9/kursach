import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

interface Service {
  serviceId: number;
  name: string;
  appointmentTime: string;
  price: number;
}

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await apiClient.get('/services');
  return response.data;
});

export const deleteService = createAsyncThunk('services/deleteService', async (id: number) => {
  await apiClient.delete(`/services/${id}`);
  return id;
});

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service.serviceId !== action.payload);
      });
  },
});

export default serviceSlice.reducer;