import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchEmployeeServices, deleteEmployeeServiceAsync } from '../redux/employeeServiceSlice';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import styles from '../styles/components/EmployeeServiceList.module.css'

const EmployeeServiceList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employeeServices = useSelector((state: RootState) => state.employeeServices.employeeServices);
  const loading = useSelector((state: RootState) => state.employeeServices.loading);
  const error = useSelector((state: RootState) => state.employeeServices.error);

  useEffect(() => {
    dispatch(fetchEmployeeServices());
  }, [dispatch]);

  const handleDelete = async (employeeId: number, serviceId: number) => {
    try {
      await dispatch(deleteEmployeeServiceAsync({ employeeId, serviceId }));
      dispatch(fetchEmployeeServices());
    } catch (error) {
      console.error('Ошибка при удалении связи сотрудника и услуги', error);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <Container>
      <h2 className="my-4">Список сотрудников и услуг</h2>
      <Table><tr style={{textAlign: "right"}}>
        <Link to={`/add-employee-service`} className="btn btn-outline-success">
                  Добавить
                </Link>
        </tr></Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={styles.th}>Сотрудник</th>
            <th className={styles.th}>Услуга</th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {employeeServices.map((employeeService) => (
            <tr key={`${employeeService.employeeId}-${employeeService.serviceId}`}>
              <td className={styles.td}>{employeeService.employeeName}</td>
              <td className={styles.td}>{employeeService.serviceName}</td>
              <td className={styles.td}>
                <Link to={`/edit-employee-service/${employeeService.employeeServiceId}`} className="btn btn-outline-primary">
                  Редактировать
                </Link>
                <Button variant="btn btn-outline-danger" onClick={() => handleDelete(employeeService.employeeId, employeeService.serviceId)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeServiceList;