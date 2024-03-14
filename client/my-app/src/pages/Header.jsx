

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
    const role = localStorage.getItem('role');

    const isPageHighlighted = (path) => {
        return location.pathname === path;
    };

    const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

    // Check if user has access to a specific feature
    const hasAccess = (requiredRoles) => {
        return requiredRoles.includes(role);
    };

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
                                    <Nav.Link href="/">
                                    <div className="home-wrapper">
                                                <div className="home">
                                                        <div className= "text-wrapper-23 fs-6">About</div>
                                                </div>
                                            </div>
                                    </Nav.Link>
                                    {role === 'admin' && (
                                    <NavDropdown title="Manage" id="basic-nav-dropdown"  style={{ 'backdrop-filter': 'blur(21px) brightness(100%);'}} variant="dark">
                                        <NavDropdown.Item href="/cm1"  style={{'background-color': '#464f34e8',}} >
                                            <div className="home-wrapper">
                                                <div className="home">
                                                        <div className= "text-wrapper-23 fs-6">Newsletter Builder</div>
                                                </div>
                                            </div>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/ManageSubscriber" style={{'background-color': '#464f34e8', }}>
                                        <div className="home-wrapper">
                                                <div className="home">
                                                        <div className= "text-wrapper-23 fs-6">Manage Subscribers</div>
                                                </div>
                                            </div>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/cm3" style={{'background-color': '#464f34e8',}}>
                                        <div className="home-wrapper">
                                                <div className="home">
                                                        <div className= "text-wrapper-23 fs-6">Manage Newsletters</div>
                                                </div>
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    )}
                                    {role && <Nav.Link href="/edituser">Edit User</Nav.Link>}
                                    <Nav.Link href="/contact">Contact</Nav.Link>
                                    {['admin', 'employee'].includes(role) && <NavDropdown title="Employee" id="clock-in-dropdown" style={{ 'backdrop-filter': 'blur(21px) brightness(100%);'}} variant="dark">
                                        <NavDropdown.Item href="/Payrollcalculator" style={{'background-color': '#464f34e8',}} >Payroll Calculator</NavDropdown.Item>
                                        <NavDropdown.Item href="/clock" style={{'background-color': '#464f34e8',}} >Clock In</NavDropdown.Item>
                                    </NavDropdown> }


                                    <NavDropdown title="Photos" id="photos-drop-down" style={{ 'backdrop-filter': 'blur(21px) brightness(100%);'}} variant="dark">
                                        {role === 'admin' && <NavDropdown.Item href="/PhotoUpload" style={{'background-color': '#464f34e8',}} >Photo Upload</NavDropdown.Item> }
                                         <NavDropdown.Item href="/ImageView" style={{'background-color': '#464f34e8',}} >Photo Gallery</NavDropdown.Item> 
                                    </NavDropdown>
                                    
                                    {['admin', 'employee'].includes(role) && <Nav.Link href="/clock">Clock in</Nav.Link>}
                                    <Nav.Link href="/calendar">Calendar</Nav.Link>
                                    {!role && <Nav.Link href="/signup">
                                        <Button className="login-button">
                                            <div className="content-12">
                                                <div className="text-wrapper-24">Login</div>
                                            </div>
                                        </Button>
                                    </Nav.Link>}
                                    {role && <Nav.Link href="/signout">
                                        <Button className="login-button">
                                            <div className="content-12">
                                                <div className="text-wrapper-24">Logout</div>
                                            </div>
                                        </Button>
                                    </Nav.Link>}
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
