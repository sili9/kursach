import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

interface Animal {
  animalId: number;
  species: string;
  name: string;
  age: number;
  complaint: string;
  employeeId: number;
}

interface AnimalState {
  animals: Animal[];
  loading: boolean;
  error: string | null;
}

const initialState: AnimalState = {
  animals: [],
  loading: false,
  error: null,
};

export const fetchAnimals = createAsyncThunk('animals/fetchAnimals', async () => {
  const response = await apiClient.get('/animals');
  return response.data;
});

export const deleteAnimal = createAsyncThunk('animals/deleteAnimal', async (id: number) => {
  await apiClient.delete(`/animals/${id}`);
  return id;
});

const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch animals';
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter((animal) => animal.animalId !== action.payload);
      });
  },
});

export default animalSlice.reducer;