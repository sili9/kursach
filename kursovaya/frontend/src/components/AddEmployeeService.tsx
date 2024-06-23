import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addEmployeeServiceAsync, fetchEmployees, fetchServices } from '../redux/employeeServiceSlice';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/components/AddForm.module.css';

interface Employee {
  employeeId: number;
  name: string;
}

interface Service {
  serviceId: number;
  name: string;
}

const AddEmployeeService: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await dispatch(fetchEmployees());
        setEmployees(employeesResponse.payload);
        const servicesResponse = await dispatch(fetchServices());
        setServices(servicesResponse.payload);
      } catch (error) {
        console.error('Ошибка при получении данных', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployeeId(parseInt(e.target.value));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServiceId(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployeeId || !selectedServiceId) {
      alert('Необходимо выбрать сотрудника и услугу');
      return;
    }

    try {
      await dispatch(addEmployeeServiceAsync({ employeeId: selectedEmployeeId, serviceId: selectedServiceId }));
      alert('Связь между сотрудником и услугой добавлена');
      setSelectedEmployeeId(0);
      setSelectedServiceId(0);
    } catch (error) {
      console.error('Ошибка при добавлении связи', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Добавить связь между сотрудником и услугой</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formEmployee">
              <Form.Label>Сотрудник</Form.Label>
              <Form.Control
                as="select"
                value={selectedEmployeeId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmployeeChange(e as any)}
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
            <Form.Group controlId="formService">
              <Form.Label>Услуга</Form.Label>
              <Form.Control
                as="select"
                value={selectedServiceId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleServiceChange(e as any)}
                required
              >
                <option value={0}>Выберите услугу</option>
                {services.map((service) => (
                  <option key={service.serviceId} value={service.serviceId}>
                    {service.name}
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

export default AddEmployeeService;