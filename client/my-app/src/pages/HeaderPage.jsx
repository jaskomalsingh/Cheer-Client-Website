import React from "react";
import {  Link  } from "react-router-dom";

const HeaderPage = ({pageTitle, to, selected}) => {

    return (
        <div className="home-wrapper">
            <div className="home">
                <Link to={to}>
                    <div className={selected?"text-wrapper-22":"text-wrapper-23"}>{pageTitle}</div>
                </Link>
                    <div className={selected?"ellipse":"ellipse-2"} /> 
            </div>
        </div>
    )
}

export default HeaderPage;
