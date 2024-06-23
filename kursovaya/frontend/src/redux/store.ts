import { configureStore } from '@reduxjs/toolkit';
import animalReducer from './animalSlice';
import employeeReducer from './employeeSlice';
import serviceReducer from './serviceSlice';
import employeeServiceReducer from './employeeServiceSlice';
import authReducer from './authSlice';
import registerReducer from './logpassSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    animals: animalReducer,
    employees: employeeReducer,
    services: serviceReducer,
    employeeServices: employeeServiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
