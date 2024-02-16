import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CMSideBar from "./CMSideBar";
import { UserRowEntry } from "./UserRowEntry";
import "../styles/cm2.css";

export const ContentManagement2 = () => {
const [data, setData] = useState([]);
  return (
    <div className="content-management">
      <div className="div">
<<<<<<< Updated upstream
        <Footer height="924px" />
=======
        < Footer/>
>>>>>>> Stashed changes
        <div className="manage-subscribers">
          <div className="rectangle">
            <div className="text-wrapper-6">Manage Subscribers</div>
          </div>
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <img className="union" alt="Union" src="union-1.svg" />
          <div className="text-wrapper-7">email@email.com</div>
          <button className="content-wrapper">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-4" />
          <img className="union-2" alt="Union" src="image.svg" />
          <div className="text-wrapper-9">email@email.com</div>
          <button className="button-2">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-5" />
          <img className="union-3" alt="Union" src="union-1-2.svg" />
          <div className="text-wrapper-10">email@email.com</div>
          <button className="button-3">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-6" />
          <img className="union-4" alt="Union" src="union-1-3.svg" />
          <div className="text-wrapper-11">email@email.com</div>
          <button className="button-4">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-7" />
          <img className="union-5" alt="Union" src="union-1-4.svg" />
          <div className="text-wrapper-12">email@email.com</div>
          <button className="button-5">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-8" />
          <img className="union-6" alt="Union" src="union-1-5.svg" />
          <div className="text-wrapper-13">email@email.com</div>
          <button className="button-6">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-9" />
          <img className="union-7" alt="Union" src="union-1-6.svg" />
          <div className="text-wrapper-14">email@email.com</div>
          <button className="button-7">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-10" />
          <img className="union-8" alt="Union" src="union-1-7.svg" />
          <div className="text-wrapper-15">email@email.com</div>
          <button className="button-8">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
          <div className="rectangle-11" />
          <img className="union-9" alt="Union" src="union-1-8.svg" />
          <div className="text-wrapper-16">email@email.com</div>
          <button className="button-9">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
        <CMSideBar currentTab="Subscribers"/>
          <div className="rectangle-11" />
          <img className="union-9" alt="Union" src="union-1-9.svg" />
          <div className="text-wrapper-16">email@email.com</div>
          <button className="button-9">
            <div className="content-4">
              <div className="text-wrapper-8">Remove</div>
            </div>
          </button>
        </div>
        <div className="text-2">
          <div className="text-wrapper-6">Content Management</div>
        </div>
        <div className="overlap">
          <img className="image" alt="Image" src="image-8.png" />
        </div>
        <Header />
      </div>
    </div>
  );
};
