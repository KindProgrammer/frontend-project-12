import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import routes from '../routes';

const NavigationMenu = () => {
    return(
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
            <Container>
            <Navbar.Brand href={routes.mainPagePath}>LoGo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <button type='button' className='btn btn-primary'>Выйти</button>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationMenu;