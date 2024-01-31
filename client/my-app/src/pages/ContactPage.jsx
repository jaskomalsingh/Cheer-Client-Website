import React from "react";
import "../styles/contact.css";
import {Header} from "./Header";
import {Footer} from "./Footer";

export const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="div">
        <Footer />
        <div className="contact-form">
          <div className="proccess">
            <div className="text-2">
              <button className="reach-out-wrapper">
                <div className="reach-out">REACH OUT</div>
              </button>
              <div className="text-3">
                <div className="text-wrapper-9">Have any concerns?</div>
                <p className="p">
                  Let us know about any questions you may have and just submit the form. We will get back to as soon as
                  we can to help provide any more information.
                </p>
              </div>
            </div>
          </div>
          <div className="form">
            <div className="element-6">
              <div className="div-2">
                <div className="text-wrapper-10">Full Name</div>
                <div className="text-4">
                  <div className="text-wrapper-11">John Doe</div>
                </div>
              </div>
              <div className="div-2">
                <div className="text-wrapper-10">Email</div>
                <div className="text-5">
                  <div className="text-wrapper-11">email@email.com</div>
                </div>
              </div>
            </div>
            <div className="element-6">
              <div className="div-2">
                <div className="text-wrapper-10">Phone</div>
                <div className="text-4">
                  <div className="text-wrapper-11">111-111-1111</div>
                </div>
              </div>
              <div className="div-2">
                <div className="text-wrapper-10">Service Inquiry (Optional)</div>
                <div className="text-5">
                  <div className="text-wrapper-11">C.H.E.E.R. Work for example</div>
                </div>
              </div>
            </div>
            <div className="element">
              <div className="div-2">
                <div className="text-wrapper-10">Message</div>
                <div className="text-6">
                  <p className="text-wrapper-11">How can we help you?</p>
                </div>
              </div>
            </div>
            <button className="send-button">
              <div className="text-wrapper-12">Send Message</div>
            </button>
          </div>
        </div>
        <Header />
      </div>
    </div>
  );
};
