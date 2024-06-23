import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/components/EditForm.module.css';

const EditService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    appointmentTime: '',
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await apiClient.get(`/services/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных услуги', error);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/services/${id}`, formData);
      alert('Услуга обновлена');
      navigate('/services');
    } catch (error) {
      console.error('Ошибка при обновлении услуги', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Редактировать услугу</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Введите название"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Введите цену"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAppointmentTime">
              <Form.Label>Время записи</Form.Label>
              <Form.Control
                type="text"
                name="appointmentTime"
                placeholder="Введите время записи"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
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

export default EditService;