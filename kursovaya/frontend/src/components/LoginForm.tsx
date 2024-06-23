import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login, logout } from '../redux/authSlice';
import { LoginFormData } from '../types/auth.types';
import apiClient from '../utils/apiClient';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const registerData = {
      login: formData.email,
      password: formData.password,
    };

    try {
      await apiClient.get('/logpass/'+ registerData.login);
      alert('Get');
      dispatch(login(formData));
    } catch (error: any) {
      dispatch(logout());
      console.error('Ошибка при регистрации', error);
      if (error.response && error.response.data) {
        alert('Ошибка при регистрации: ' + JSON.stringify(error.response.data));
      } else {
        alert('Ошибка при регистрации: ' + error.message);
      }
    }
  };



  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <div className="alert alert-success">
          <h2>Добро пожаловать, {user?.email}!</h2>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Авторизация</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Войти</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
