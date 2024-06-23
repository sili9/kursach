import React, { useState } from 'react';
import apiClient from '../utils/apiClient';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const AddEmployee: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    speciality: '',
    imageData: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.phone || !formData.speciality) {
      alert('Все поля должны быть заполнены');
      return;
    }

    try {
      await apiClient.post('/employees', formData);
      alert('Сотрудник добавлен');
    } catch (error: any) {
      console.error('Ошибка при добавлении сотрудника', error);
      if (error.response && error.response.data) {
        alert('Ошибка при добавлении сотрудника: ' + JSON.stringify(error.response.data));
      } else {
        alert('Ошибка при добавлении сотрудника: ' + error.message);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Добавить сотрудника</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Введите ФИО"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
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
          </Col>
        </Row>
        <Row>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSpeciality">
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
          </Col>
        </Row>
        <Row>
        <Col md={6}>
            <Form.Group controlId="formImageData">
              <Form.Label>Фото</Form.Label>
              <Form.Control
                type="text"
                name="imageData"
                placeholder="Введите название фото"
                value={formData.imageData}
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

export default AddEmployee;