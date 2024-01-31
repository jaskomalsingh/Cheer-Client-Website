import React from "react";
import "../styles/header.css";

export const Header = () => {
    return (
        <div className="overlap">
            <header className="header">
                <div className="ongoing-living-wrapper">
                    <p className="ongoing-living">Ongoing Living &amp; Learning Inc.</p>
                </div>
                <div className="menu-bar">
                    <div className="home-wrapper">
                        <div className="home">
                            <div className="text-wrapper-22">About</div>
                            <div className="ellipse" />
                        </div>
                    </div>
                    <div className="element-17">
                        <div className="home-2">
                            <div className="text-wrapper-23">Page 1</div>
                            <div className="ellipse-2" />
                        </div>
                    </div>
                    <div className="element-17">
                        <div className="home-2">
                            <div className="text-wrapper-23">Page 2</div>
                            <div className="ellipse-2" />
                        </div>
                    </div>
                    <div className="element-18">
                        <div className="text-wrapper-23">Page 3</div>
                        <div className="ellipse-2" />
                    </div>
                    <div className="element-18">
                        <div className="text-wrapper-23">Page 4</div>
                        <div className="ellipse-2" />
                    </div>
                    <div className="element-19">
                        <div className="text-wrapper-23">Contact</div>
                        <div className="ellipse-2" />
                    </div>
                </div>
                <button className="login-button">
                    <div className="content-12">
                        <div className="text-wrapper-24">Login</div>
                    </div>
                </button>
            </header>
            <img className="image-4" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image-8@2x.png" />
        </div>
    )
}