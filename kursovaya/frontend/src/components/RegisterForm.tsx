import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RegisterFormData } from '../types/logpass.types';
import { fetchLogpass, login } from '../redux/logpassSlice';
import apiClient from '../utils/apiClient';

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<RegisterFormData>({ email: '', password: '' });
  const { log1n, isRegistered } = useSelector((state: RootState) => state.register);

  useEffect(() => {
    dispatch(fetchLogpass());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData));

    const registerData = {
      login: formData.email,
      password: formData.password,
    };

    try {
      await apiClient.post('/logpass', registerData);
      alert('Зарегистрирован');
    } catch (error: any) {
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
      {isRegistered ? (
        <div className="alert alert-success">
          <h2>Спасибо за регистрацию, {log1n?.email}!</h2>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Регистрация</h2>
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
              <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
