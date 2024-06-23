import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

interface Employee {
  employeeId: number;
  name: string;
}

const EditAnimal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    species: '',
    name: '',
    age: '',
    complaint: '',
    employeeId: 0,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await apiClient.get(`/animals/${id}`);
        setFormData(response.data);
        setSelectedEmployeeId(response.data.employeeId);
      } catch (error) {
        console.error('Ошибка при получении данных животного', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка сотрудников', error);
      }
    };

    fetchAnimal();
    fetchEmployees();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    try {
      const updatedAnimal = { ...formData, employeeId: selectedEmployeeId };
      await apiClient.put(`/animals/${id}`, updatedAnimal);
      alert('Животное обновлено');
      navigate('/animals');
    } catch (error) {
      console.error('Ошибка при обновлении животного', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Редактировать животное</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formSpecies">
              <Form.Label>Вид</Form.Label>
              <Form.Control
                type="text"
                name="species"
                placeholder="Введите вид"
                value={formData.species}
                onChange={handleChange}
                required
              />
            </Form.Group>
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
            <Form.Group controlId="formAge">
              <Form.Label>Возраст</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Введите возраст"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

          </Col>
          <Col md={6}>
          <Form.Group controlId="formAge">
              <Form.Label>Жалоба</Form.Label>
              <Form.Control
                type="text"
                name="complaint"
                placeholder="Введите жалобы"
                value={formData.complaint}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmployeeId">
              <Form.Label>Сотрудник</Form.Label>
              <Form.Control
                as="select"
                name="employeeId"
                value={selectedEmployeeId}
                onChange={handleChange}
                required
              >
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
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default EditAnimal;