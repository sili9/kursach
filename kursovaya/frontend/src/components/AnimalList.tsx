import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchAnimals, deleteAnimal } from '../redux/animalSlice';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import styles from '../styles/components/AnimalList.module.css';

const AnimalList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const animals = useSelector((state: RootState) => state.animals.animals);
  const loading = useSelector((state: RootState) => state.animals.loading);
  const error = useSelector((state: RootState) => state.animals.error);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteAnimal(id));
      dispatch(fetchAnimals());
    } catch (error) {
      console.error('Ошибка при удалении животного', error);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <Container>
      <h2 className="my-4">Список животных</h2>
      <Table><tr style={{textAlign: "right"}}>
        <Link to={`/add-animal`} className="btn btn-outline-success">
                  Добавить
                </Link>
        </tr></Table>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={styles.th}>Вид</th>
            <th className={styles.th}>Имя</th>
            <th className={styles.th}>Возраст</th>
            <th className={styles.th}>Жалоба</th>
            <th className={styles.th}>ID сотрудника</th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.animalId}>
              <td className={styles.td}>{animal.species}</td>
              <td className={styles.td}>{animal.name}</td>
              <td className={styles.td}>{animal.age}</td>
              <td className={styles.td}>{animal.complaint}</td>
              <td className={styles.td}>{animal.employeeId}</td>
              <td className={styles.td}>
                <Link to={`/edit-animal/${animal.animalId}`} className="btn btn-outline-primary">
                  Редактировать
                </Link>
                <Button variant="btn btn-outline-danger" onClick={() => handleDelete(animal.animalId)}>
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

export default AnimalList;