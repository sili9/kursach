import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/components/EditForm.module.css';

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    speciality: '',
    imageData: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiClient.get(`/employees/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных сотрудника', error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/employees/${id}`, formData);
      alert('Сотрудник обновлен');
      navigate('/employees');
    } catch (error) {
      console.error('Ошибка при обновлении сотрудника', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Редактировать сотрудника</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Введите имя"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Адрес</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Введите адрес"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Введите телефон"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Специализация</Form.Label>
              <Form.Control
                type="text"
                name="speciality"
                placeholder="Введите специализацию"
                value={formData.speciality}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>Фото</Form.Label>
              <Form.Control
                type="text"
                name="imageData"
                placeholder="Загрузите фото"
                value={formData.imageData}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default EditEmployee;