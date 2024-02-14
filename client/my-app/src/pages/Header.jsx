import React, { useState, useEffect, Component } from "react";
import "../styles/header.css";
import HeaderPage from "./HeaderPage";
import { Link, useLocation } from "react-router-dom";

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

    return (
        <div className="overlap">
            <header className="header">
                <Link to="/">
                <img className="image-4" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image-8@2x.png" />
                </Link>
                <div className="ongoing-living-wrapper">
                    <p className="ongoing-living">Ongoing Living &amp; Learning Inc.</p>
                </div>
                <div className="menu-bar">
                    <HeaderPage pageTitle="About" to="/" onClick={() => onClick("About")} selected={isPageHighlighted("/")}></HeaderPage>
                    <HeaderPage pageTitle="Newsletter" to="/cm1" onClick={() => onClick("CM1")} selected={isPageHighlighted("/cm1")}></HeaderPage>
                    <HeaderPage pageTitle="CM2" to="/cm2" onClick={() => onClick("CM2")} selected={isPageHighlighted("/cm2")}></HeaderPage>
                    <HeaderPage pageTitle="CM3" to="/cm3" onClick={() => onClick("CM3")} selected={isPageHighlighted("/cm3")}></HeaderPage>
                    <HeaderPage pageTitle="Admin" to="/adminusercontrol" onClick={() => onClick("Admin")} selected={isPageHighlighted("/adminusercontrol")}></HeaderPage>
                    <HeaderPage pageTitle="Contact" to="/contact" onClick={() => onClick("Contact")} selected={isPageHighlighted("/contact")}></HeaderPage>
                    <HeaderPage pageTitle="Clock in/Clock out" to="/clock" onClick={() => onClick("Clock")} selected={isPageHighlighted}></HeaderPage>
                </div>
                <Link to="/signin">
                    <button className="login-button">
                        <div className="content-12">
                            <div className="text-wrapper-24">Login</div>
                        </div>
                    </button>
                </Link>
            </header>
        </div>
    )
}


export default Header;