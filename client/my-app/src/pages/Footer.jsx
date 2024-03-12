import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import { useMediaQuery } from 'react-responsive';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer({ height }) {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  console.log(isMobile)
  return (
    <div className="footer-content">
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          <div className="overlap-group">
            <div className="background">
              <div className="overlap-group">
                <div className="background-wrapper">
                  <img className="img" alt="Background" src="https://c.animaapp.com/lPCECV6H/img/background.png" />
                </div>
              </div>
            </div>
            {isMobile
              ?
              <div className="content-2">
                <Row>
                  <Col>
                    <img className="image-4" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image-8@2x.png" />
                  </Col>
                  <Col>
                    <Link to="/contact">
                      <button className="button">
                        <div className="text-wrapper-5">Contact Us</div>
                      </button>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <div className="copyright">
                    <p className="text-wrapper">
                      ©2024 SE3350 Group 1.
                    </p>
                  </div>
                </Row>
              </div>
              :
              <div>
                <div className="copyright">
                  <img className="line" alt="Line" src="https://c.animaapp.com/lPCECV6H/img/line-5.svg" />
                  <p className="text-wrapper">
                    ©2024 SE3350 Group 1. All rights reserved | Terms of Service | Privacy Policy
                  </p>
                </div>
                <div className="content-2">
                  <div className="logo">
                    <div className="logo-wrapper">

                      <img className="logo-full" alt="Logo" src="https://c.animaapp.com/lPCECV6H/img/logo.svg" />

                    </div>
                  </div>
                  <div className="content-3">

                    <div className="footer-div-wrapper">
                      <div className="title">
                        <div className="text-wrapper-2">Product</div>
                        <div className="footer-rectangle" />
                      </div>
                      <div className="text">
                        <div className="text-wrapper-3">C.H.E.E.R. Works</div>
                        <div className="text-wrapper-4">C.H.E.E.R. Group</div>
                        <div className="text-wrapper-4">C.H.E.E.R. Living</div>
                        <div className="text-wrapper-4">C.H.E.E.R. Connections</div>
                      </div>
                    </div>
                    <div className="element">
                      <div className="title">
                        <div className="text-wrapper-2">Company</div>
                        <div className="footer-rectangle" />
                      </div>
                      <div className="text">
                        <Link to="/"><div className="text-wrapper-3">About</div></Link>
                        <Link to="/cm1"><div className="text-wrapper-4">CM1</div></Link>
                        <Link to="/cm2"><div className="text-wrapper-4">CM2</div></Link>
                        <Link to="/cm3"><div className="text-wrapper-4">CM3</div></Link>
                        <Link to="/adnminusercontrol"><div className="text-wrapper-4">Admin</div></Link>
                        <Link to="/contact"><div className="text-wrapper-4">Contact Us</div></Link>
                      </div>
                    </div>
                    <div className="div-3">
                      <div className="title">
                        <div className="text-wrapper-2">{""}</div>
                      </div>
                      <Link to="/contact">
                        <button className="button">
                          <div className="text-wrapper-5">Contact Us</div>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Footer;