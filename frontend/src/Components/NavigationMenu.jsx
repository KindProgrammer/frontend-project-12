import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import routes from '../routes.js';
import AuthContext from '../context/AuthContext.jsx';

const NavigationMenu = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const logOut = () => {
        auth.logOut();
        navigate(routes.loginPagePath);
    }

    return(
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
            <Container>
            <Navbar.Brand href={routes.mainPagePath}>LoGo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {auth.loggedIn ? (<button type='button' onClick={logOut} className='btn btn-primary'>Выйти</button>) : ''}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationMenu;