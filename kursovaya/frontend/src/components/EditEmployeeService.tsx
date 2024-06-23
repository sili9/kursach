import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchEmployeeServices, updateEmployeeServiceAsync, EmployeeService } from '../redux/employeeServiceSlice';
import { fetchEmployees, fetchServices } from '../redux/employeeServiceSlice';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/components/EditForm.module.css';

interface Employee {
  employeeId: number;
  name: string;
}

interface Service {
  serviceId: number;
  name: string;
}

const EditEmployeeService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    employeeId: 0,
    serviceId: 0
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeServicesResponse = await dispatch(fetchEmployeeServices());
        const employeeService = (employeeServicesResponse.payload as EmployeeService[]).find((es) => es.employeeServiceId === Number(id));

        if (employeeService) {
          setFormData({
            employeeId: employeeService.employeeId,
            serviceId: employeeService.serviceId
          });
        }

        const employeesResponse = await dispatch(fetchEmployees());
        setEmployees(employeesResponse.payload);

        const servicesResponse = await dispatch(fetchServices());
        setServices(servicesResponse.payload);
      } catch (error) {
        console.error('Ошибка при получении данных', error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateEmployeeServiceAsync({
        employeeServiceId: Number(id),
        employeeName: '',
        serviceName: '',
        employeeId: formData.employeeId,
        serviceId: formData.serviceId
      }));
      alert('Связь обновлена');
      navigate('/employeeservices');
    } catch (error) {
      console.error('Ошибка при обновлении связи', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Редактировать связь между сотрудником и услугой</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formEmployee">
              <Form.Label>Сотрудник</Form.Label>
              <Form.Control
                as="select"
                name="employeeId"
                value={formData.employeeId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
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
                name="serviceId"
                value={formData.serviceId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
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
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default EditEmployeeService;