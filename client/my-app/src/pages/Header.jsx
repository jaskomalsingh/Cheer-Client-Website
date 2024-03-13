

import React, { useState, useEffect } from "react";
import "../styles/header.css";
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useMediaQuery } from 'react-responsive';

function Header() {
    const [activePage, setActivePage] = useState("About");
    const location = useLocation();

    const isPageHighlighted = (path) => {
        return location.pathname === path;
    };

    const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

    return (
        <div className="overlap">
            <header className="header">
                <div className="menu-bar">
                    <Navbar collapseOnSelect expand="md" sticky="top" className="navbar" bg="transparent" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img className="image-4" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image-8@2x.png" />
                                <div className="ongoing-living-wrapper">
                                    {isMobile ? <p className="ongoing-living">O.L.L.I.</p> : <p className="ongoing-living">Ongoing Living & Learning Inc.</p>}
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{'background-color': '#464f34e8', 'backdrop-filter': 'blur(21px) brightness(100%);'}}/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">About</Nav.Link>
                                    <NavDropdown title="Manage" id="basic-nav-dropdown" style={{ 'backdrop-filter': 'blur(21px) brightness(100%);'}} variant="dark">
                                        <NavDropdown.Item href="/cm1">Newsletter Builder</NavDropdown.Item>
                                        <NavDropdown.Item href="/ManageSubscriber">Manage Subscribers</NavDropdown.Item>
                                        <NavDropdown.Item href="/cm3">Manage Newsletters</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/edituser">Edit User</Nav.Link>
                                    <Nav.Link href="/contact">Contact</Nav.Link>
                                    <NavDropdown title="Employee" id="clock-in-dropdown" style={{ 'backdrop-filter': 'blur(21px) brightness(100%);'}} variant="dark">
                                        <NavDropdown.Item href="/Payrollcalculator">Payroll Calculator</NavDropdown.Item>
                                        <NavDropdown.Item href="/clock">Clock In</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/calendar">Calendar</Nav.Link>
                                    <Nav.Link href="/signup">
                                        <Button className="login-button">Login</Button>
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </header>
        </div>
    );
}

export default Header;
