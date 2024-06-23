import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchServices, deleteService } from '../redux/serviceSlice';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import styles from '../styles/components/ServiceList.module.css'

const ServiceList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.services.services);
  const loading = useSelector((state: RootState) => state.services.loading);
  const error = useSelector((state: RootState) => state.services.error);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteService(id));
      dispatch(fetchServices());
    } catch (error) {
      console.error('Ошибка при удалении услуги', error);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <Container>
      <h2 className="my-4">Список услуг</h2>
      <Table><tr style={{textAlign: "right"}}>
        <Link to={`/add-service`} className="btn btn-outline-success">
                  Добавить
                </Link>
        </tr></Table>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th className={styles.th}>ID</th>
            <th className={styles.th}>Название</th>
            <th className={styles.th}>Цена</th>
            <th className={styles.th}>Время записи</th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.serviceId}>
              <td className={styles.td}>{service.serviceId}</td>
              <td className={styles.td}>{service.name}</td>
              <td className={styles.td}>{service.price}</td>
              <td className={styles.td}>{service.appointmentTime}</td>
              <td className={styles.td}>
                <Link to={`/edit-service/${service.serviceId}`} className="btn btn-outline-primary">
                  Редактировать
                </Link>
                <Button variant="btn btn-outline-danger" onClick={() => handleDelete(service.serviceId)}>
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

export default ServiceList;