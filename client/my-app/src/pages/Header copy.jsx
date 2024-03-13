import React, { useState, useEffect } from "react";
import "../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useMediaQuery } from 'react-responsive';

function Header() {
    const [activePage, setActivePage] = useState("About");
    const location = useLocation();
    const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

    // Retrieve role from localStorage
    const role = localStorage.getItem('role');

    const isPageHighlighted = (path) => {
        return location.pathname === path;
    };

    const onClick = (page) => {
        setActivePage(page);
    };

    // Check if user has access to a specific feature
    const hasAccess = (requiredRoles) => {
        return requiredRoles.includes(role);
    };

    return (
        <div className="overlap">
            <header className="header">
                <div className="menu-bar">
                    <Navbar collapseOnSelect expand="md" sticky="top" className="navbar" bg="transparent"  variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img alt="Logo" src="logo-url.png" />
                                <div className="brand-name">Ongoing Living & Learning Inc.</div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">About</Nav.Link>
                                    {role && <Nav.Link href="/edituser">Edit User</Nav.Link>}
                                    {['admin', 'employee'].includes(role) && <Nav.Link href="/clock">Clock in</Nav.Link>}
                                    {role === 'admin' && (
                                        <NavDropdown title="Manage" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/cm1">Newsletter Builder</NavDropdown.Item>
                                            <NavDropdown.Item href="/ManageSubscriber">Manage Subscribers</NavDropdown.Item>
                                            <NavDropdown.Item href="/cm3">Manage Newsletters</NavDropdown.Item>
                                        </NavDropdown>
                                    )}
                                    <Nav.Link href="/contact">Contact</Nav.Link>
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
