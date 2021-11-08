import React from "react";
import { Navbar, Container, Nav, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
const Menu = () => (
    <Row>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Өвөрхангай ПК</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Эхлэл</NavLink>
                        <NavLink to="/irc" className="nav-link">Ирц</NavLink>
                        <NavLink to="/students" className="nav-link">Суралцагчид</NavLink>
                        <NavLink to="/TeacherClass" className="nav-link">Ангиуд</NavLink>
                        <NavLink to="/TeacherLesson" className="nav-link">Заадаг хичээлүүд</NavLink>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </Row>
)

export default Menu;