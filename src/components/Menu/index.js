import React, { useContext } from "react";
import { Navbar, Container, Nav, Row, NavDropdown } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/MyContext";

const Menu = () => {
    const state = useContext(MyContext);
    if (state.userType == false) {
        return (
            <Row>
                <Navbar bg="info" expand="lg" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">Өвөрхангай ПК</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/home" className="nav-link">Эхлэл</NavLink>
                                <NavLink to="/Ircshow" className="nav-link">Ирц</NavLink>
                                <NavDropdown title="Манай анги">
                                    <NavDropdown.Item>
                                        <NavLink to="/students">Ирцийн жагсаалт</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink to="/students/negtgel">Ирцийн нэгтгэл</NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavLink to="/TeacherClass" className="nav-link">Ангиуд</NavLink>
                                <NavLink to="/TeacherLesson" className="nav-link">Заадаг хичээлүүд</NavLink>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#">{state.theUser.lname}</Nav.Link>
                                <Nav.Link onClick={() => state.logoutUser()}>
                                    Гарах
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        )
    }
    else {
        return (
            <Row>
                <Navbar bg="secondary" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Өвөрхангай ПК</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/home" className="nav-link">Эхлэл</NavLink>
                                <NavLink to="/SaHome" className="nav-link">Ирцийн Хувь</NavLink>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#">{state.theUser.lname}</Nav.Link>
                                <Nav.Link onClick={() => state.logoutUser()}>
                                    Гарах
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        )
    }
}
export default Menu;