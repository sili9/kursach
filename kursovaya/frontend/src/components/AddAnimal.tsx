import React, { useState, useEffect, ChangeEvent } from 'react';
import apiClient from '../utils/apiClient';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

interface Employee {
  employeeId: number;
  name: string;
}

const AddAnimal: React.FC = () => {
  const [formData, setFormData] = useState({
    species: '',
    name: '',
    age: '',
    complaint: '',

  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка сотрудников', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'employeeId') {
      setSelectedEmployeeId(parseInt(value));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.species || !formData.name || !formData.age || !formData.complaint || !selectedEmployeeId) {
      alert('Все поля должны быть заполнены');
      return;
    }

    const animalData = {
      species: formData.species,
      name: formData.name,
      age: parseInt(formData.age),
      complaint: formData.complaint,
      employeeId: selectedEmployeeId,
    };

    try {
      await apiClient.post('/animals', animalData);
      alert('Животное добавлено');
    } catch (error: any) {
      console.error('Ошибка при добавлении животного', error);
      if (error.response && error.response.data) {
        alert('Ошибка при добавлении животного: ' + JSON.stringify(error.response.data));
      } else {
        alert('Ошибка при добавлении животного: ' + error.message);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Добавить животное</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formSpecies">
              <Form.Label>Вид</Form.Label>
              <Form.Control type="text" name="species" placeholder="Введите вид" value={formData.species} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control type="text" name="name" placeholder="Введите имя" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Возраст</Form.Label>
              <Form.Control type="number" name="age" placeholder="Введите возраст" value={formData.age} onChange={handleChange} required />
            </Form.Group>
            
          </Col>
          <Col md={6}>
          <Form.Group controlId="formAge">
              <Form.Label>Жалобы</Form.Label>
              <Form.Control type="text" name="complaint" placeholder="Введите жалобы" value={formData.complaint} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formEmployeeId">
              <Form.Label>Сотрудник</Form.Label>
              <Form.Control as="select" name="employeeId" value={selectedEmployeeId} onChange={handleChange} required>
                <option value={0}>Выберите сотрудника</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.name}
                  </option>
                ))}
              </Form.Control>
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

export default AddAnimal;
