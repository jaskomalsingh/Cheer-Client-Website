import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { ContentManagement1 } from './ContentManagement1'
import { ContentManagement2 } from './ContentManagement2'
import { ContentManagement3 } from './ContentManagement3'
import "../styles/cmsidebar.css";

function CMSideBar(currentTab) {
    const [activeTab, setActiveTab] = useState(currentTab);

    const onClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="mini-side-bar">
            <div className="overlap-group-2">
                <div className="nav">
                    <Link to="../cm1">
                        <div className="new-add-button" />
                    </Link>
                    <Link  to="../ManageSubscriber">
                        <div className="icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </Link>
                    <Link  to="../cm3">
                        <div className="icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 17H8" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 13H8" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 9H9H8" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14 2V8H20" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </Link>
                </div>
                <Link to="../cm3">
                    <div className="text-wrapper-17 " /*style={activeTab==="Subscribers" ?  {"text-decoration": "underline", "text-decoration-thickness": "20%"}: {}} onClick={() => onClick("Subscribers")}*/>Newsletters</div>
                </Link>
                <Link to="../cm2">
                    <div className="text-wrapper-18">Subscribers</div>
                </Link>
                <Link to="../cm1">
                    <div className="text-wrapper-19">New...</div>
                </Link>
                <img className="line-2" alt="Line" src="line-6.svg" />
                <img className="line-3" alt="Line" src="line-7.svg" />
            </div>

        </div>
    )
}

export default CMSideBar;