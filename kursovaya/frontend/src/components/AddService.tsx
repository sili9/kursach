import React, { useState } from 'react';
import apiClient from '../utils/apiClient';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/components/AddForm.module.css';

const AddService: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    appointmentTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.appointmentTime) {
      alert('Все поля должны быть заполнены');
      return;
    }

    try {
      await apiClient.post('/services', {
        ...formData,
        price: parseFloat(formData.price),
      });
      alert('Услуга добавлена');
    } catch (error: any) {
      console.error('Ошибка при добавлении услуги', error);
      if (error.response && error.response.data) {
        alert('Ошибка при добавлении услуги: ' + JSON.stringify(error.response.data));
      } else {
        alert('Ошибка при добавлении услуги: ' + error.message);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Добавить услугу</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formName">
              <Form.Label>Название услуги</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Название услуги"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Цена услуги</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                placeholder="Цена услуги"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAppointmentTime">
              <Form.Label>Время записи</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="appointmentTime"
                placeholder="Время записи"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Добавить
        </Button>
      </Form>
    </Container>
  );
};

export default AddService;