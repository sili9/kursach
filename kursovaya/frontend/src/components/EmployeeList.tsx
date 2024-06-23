import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchEmployees, deleteEmployee } from '../redux/employeeSlice';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import styles from '../styles/components/EmployeeList.module.css';

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees.employees);
  const loading = useSelector((state: RootState) => state.employees.loading);
  const error = useSelector((state: RootState) => state.employees.error);
  
  
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteEmployee(id));
      dispatch(fetchEmployees());
    } catch (error) {
      console.error('Ошибка при удалении сотрудника', error);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <Container>
      <h2 className="my-4">Список сотрудников</h2>
      <Table><tr style={{textAlign: "right"}}>
        <Link to={`/add-employee`} className="btn btn-outline-success">
                  Добавить
                </Link>
        </tr></Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Имя</th>
            <th className={styles.th}>Адрес</th>
            <th className={styles.th}>Телефон</th>
            <th className={styles.th}>Специализация</th>
            <th className={styles.th}>Фото</th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td className={styles.td}>{employee.employeeId}</td>
              <td className={styles.td}>{employee.name}</td>
              <td className={styles.td}>{employee.address}</td>
              <td className={styles.td}>{employee.phone}</td>
              <td className={styles.td}>{employee.speciality}</td>
              <td className={styles.td}><img className="user-image"  src={'/assets/photos/'+ employee.imageData + '.jpg'} alt="User Image" width={200} height={250} /></td>
              <td className={styles.td}>
                <Link to={`/edit-employee/${employee.employeeId}`} className="btn btn-outline-primary">
                  Редактировать
                </Link>
                <Button variant="btn btn-outline-danger" onClick={() => handleDelete(employee.employeeId)}>
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

export default EmployeeList;