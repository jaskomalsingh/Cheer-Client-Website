import React, { useState, useEffect, Component } from "react";
import "../styles/header.css";
import HeaderPage from "./HeaderPage";
import { Link, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMediaQuery } from 'react-responsive';

function Header() {
    const [activePage, setActivePage] = useState("About");

    //const isPageHighlighted = (page) => {
    //    return activePage === page; 
    //};

    const location = useLocation();

    const isPageHighlighted = (path) => {
        // Assuming `to` is the path you pass to each HeaderPage component
        return location.pathname === path;
    };

    const onClick = (page) => {
        setActivePage(page);
    };
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    return (
        <div className="overlap">
            <header className="header">
                <div className="menu-bar">
                    
                    <Navbar collapseOnSelect expand="md" sticky="top" className="navbar" bg="transparent"  variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img className="image-4" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image-8@2x.png" />
                                <div className="ongoing-living-wrapper">
                                    {isMobile ? <p className="ongoing-living">O.L.L.I.</p> : <p className="ongoing-living">Ongoing Living &amp; Learning Inc.</p>}
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
                                    <Nav.Link href="/adminusercontrol">Admin</Nav.Link>
                                    <Nav.Link href="/contact">Contact</Nav.Link>
                                    <Nav.Link href="/clock">Clock in</Nav.Link>
                                    <Nav.Link href="/signup">
                                        <Button className="login-button">
                                            <div className="content-12">
                                                <div className="text-wrapper-24">Login</div>
                                            </div>
                                        </Button>
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </header>
        </div>
    )
}


export default Header;