import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import AnimalList from './components/AnimalList';
import EmployeeList from './components/EmployeeList';
import ServiceList from './components/ServiceList';
import AddAnimal from './components/AddAnimal';
import AddEmployee from './components/AddEmployee';
import AddService from './components/AddService';
import EditAnimal from './components/EditAnimal';
import EditEmployee from './components/EditEmployee';
import EditService from './components/EditService';
import EmployeeServiceList from './components/EmployeeServiceList';
import AddEmployeeService from './components/AddEmployeeService';
import EditEmployeeService from './components/EditEmployeeService';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';


const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <Router>
      <Navbar bg="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{color:"white"}}>
            VetClinic
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
            {(isAuthenticated) ? (
                <>
                  <Nav.Link as={Link} to="/" style={{color:"white"}} className='mx-5'>
                Животные
              </Nav.Link>
              <Nav.Link as={Link} to="/employees" style={{color:"white"}} className='mx-5'>
                Сотрудники
              </Nav.Link>
              <Nav.Link as={Link} to="/services" style={{color:"white"}} className='mx-5'>
                Услуги
              </Nav.Link>
              <Nav.Link as={Link} to="/employeeservices" style={{color:"white"}} className='mx-5'>
                Сотрудники и услуги
              </Nav.Link>
                </>
              ) : (
                <><Nav.Link as={Link} to="/login" style={{ color: "white" }} className='mx-5'>
                    Войти
                  </Nav.Link><Nav.Link as={Link} to="/register" style={{ color: "white" }} className='mx-5'>
                      Зарегистрироваться
                    </Nav.Link></>
              )}
              </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={isAuthenticated ? <AnimalList /> : <LoginForm />} />
          <Route path="/animals" element={isAuthenticated ? <AnimalList /> : <LoginForm />} />
          <Route path="/employees" element={isAuthenticated ? <EmployeeList /> : <LoginForm />} />
          <Route path="/services" element={isAuthenticated ? <ServiceList /> : <LoginForm />} />
          <Route path="/employeeservices" element={isAuthenticated ? <EmployeeServiceList /> : <LoginForm />} />
          <Route path="/add-animal" element={<AddAnimal />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/add-employee-service" element={<AddEmployeeService />} />
          <Route path="/edit-animal/:id" element={<EditAnimal />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/edit-service/:id" element={<EditService />} />
          <Route path="/edit-employee-service/:id" element={<EditEmployeeService />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
