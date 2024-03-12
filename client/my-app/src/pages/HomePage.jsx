import React from "react";
import "../styles/homePage.css";
import "../styles/footer.css";
import Header from "./Header";
import Footer from "./Footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useMediaQuery } from 'react-responsive';

export const HomePage = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  return (
    <Container fluid>
      <div className="home-page">
        <div className="div">
          <Header />
          <div className="banner">
            <img className="image-3" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image-6.png" />
          </div>
          <div className="about">
            <div className="content-11">
              <div className="text-5">
                <div className="element-15">
                  <div className="about-us-wrapper">
                    <div className="text-wrapper-9">ABOUT US</div>
                  </div>
                  <p className="about-ongoing-living">About Ongoing Living &amp; Learning Inc.</p>
                </div>
                <div className="element-16">
                  <p className="text-wrapper-20">
                    OLLI is a registered not-for-profit caregiver driven company with four areas of focus: Cheer Group;
                    Cheer Works; Cheer Connections; and, Cheer Living
                  </p>
                  <p className="text-wrapper-21">
                    Vision Statement— To be a community of inclusion and a circle of friendship that supports and enhances
                    the lives of our loved ones with intellectual disabilities as well as the whole family.
                  </p>
                </div>
              </div>
            </div>
            {isMobile ?
              <img className="image-2" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image.png" />
              :
              <div className="image">
                <div className="overlap-group-2">
                  <img
                    className="background-pattern"
                    alt="Background pattern"
                    src="https://c.animaapp.com/lPCECV6H/img/background-pattern@2x.png"
                  />
                  <img className="image-2" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image.png" />
                </div>
              </div>
            }
          </div>
          <div className="values">
            <div className="history">
              <div className="text-2">
                <div className="history-wrapper">
                  <div className="history-2">HISTORY</div>
                </div>
                <div className="text-2">
                  <div className="text-wrapper-6">How it all started</div>
                </div>
              </div>
              <div className="element-2">
                <img className="line-2" alt="Line" src="https://c.animaapp.com/lPCECV6H/img/line-2.svg" />
                <div className="content-4">
                  <div className="element-3" />
                  <div className="div-2">
                    <div className="text-wrapper-7">Founding and Purpose</div>
                    <p className="p">
                      Founded in 2021, OLLI was established by a group of caregivers and activists to support
                      seniors with intellectual disabilities, fostering a supportive community for them and their
                      families.
                    </p>
                  </div>
                </div>
              </div>
              <div className="element-2">
                <img className="line-2" alt="Line" src="https://c.animaapp.com/lPCECV6H/img/line-2.svg" />
                <div className="content-5">
                  <div className="element-4" />
                  <div className="div-2">
                    <div className="text-wrapper-7">Expansion of Services</div>
                    <p className="text-wrapper-8">
                      OLLI initially offered support groups, then expanded to include assisted housing and
                      employment programs in the 2000s, enhancing seniors&#39; independence and engagement.
                    </p>
                  </div>
                </div>
              </div>
              <div className="element-2">
                <img className="line-2" alt="Line" src="https://c.animaapp.com/lPCECV6H/img/line-2.svg" />
                <div className="content-5">
                  <div className="element-5" />
                  <div className="div-2">
                    <div className="text-wrapper-7">Present</div>
                    <p className="text-wrapper-8">
                      Today, OLLI is a leading example in inclusive senior care, continuously evolving to meet the
                      needs of seniors and their families, staying true to its vision of a community-based supportive
                      network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="values-2">
              <div className="text-3">
                <div className="core-wrapper">
                  <div className="text-wrapper-9">CORE</div>
                </div>
                <div className="text-wrapper-10">Our Values</div>
              </div>
              <div className="sub-text">
                <p className="at-o-l-l-i-our">
                  At O.L.L.I, our values are the cornerstone of our commitment to providing exceptional care and creating
                  a nurturing environment for our seniors. We uphold these principles in every aspect of our center&#39;s
                  operations and community interactions.
                </p>
              </div>
              {isMobile ? 
                <div className="div-3">
                <div className="element-6">
                  <div className="content-wrapper">
                    <div className="div-wrapper">
                      <div className="div-2">
                        <div className="text-wrapper-7">Compassion</div>
                      </div>
                    </div>
                  </div>
                  <div className="element-7">
                    <div className="div-wrapper">
                      <div className="div-2">
                        <div className="text-wrapper-7">Respect</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="element-6">
                  <div className="element-8">
                    <div className="div-wrapper">
                      <div className="div-2">
                        <div className="text-wrapper-7">Integrity</div>
                      </div>
                    </div>
                  </div>
                  <div className="element-9">
                    <div className="content-6">
                      <div className="div-2">
                        <div className="text-wrapper-7">Joy and Positivity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className="div-3">
              <div className="element-6">
                <div className="content-wrapper">
                  <div className="div-wrapper">
                    <div className="div-2">
                      <div className="text-wrapper-7">Compassion</div>
                      <p className="text-wrapper-11">
                        We believe in showing deep empathy and understanding towards all our residents. Our approach is
                        to care for each individual with kindness, patience, and a nurturing spirit.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="element-7">
                  <div className="div-wrapper">
                    <div className="div-2">
                      <div className="text-wrapper-7">Respect</div>
                      <p className="text-wrapper-12">
                        Every senior is treated with the utmost respect and dignity. We recognize the rich life
                        experiences of our residents and honor their wisdom and individuality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="element-6">
                <div className="element-8">
                  <div className="div-wrapper">
                    <div className="div-2">
                      <div className="text-wrapper-7">Integrity</div>
                      <p className="text-wrapper-12">
                        Integrity guides our actions. We are committed to honesty, ethical practices, and transparency
                        in all our dealings with residents, their families, and our community.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="element-9">
                  <div className="content-6">
                    <div className="div-2">
                      <div className="text-wrapper-7">Joy and Positivity</div>
                      <p className="text-wrapper-12">
                        Our center is a place of happiness and optimism. We encourage activities and interactions that
                        bring joy and laughter to our residents’ lives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              }
            </div>
          </div>
          <div className="element-ways">
            <div className="content-7">
              <div className="text-4">
                <div className="services-wrapper">
                  <div className="services">SERVICES</div>
                </div>
                <p className="text-wrapper-13">Four ways that OLLI can help you</p>
              </div>

              {isMobile ?
                <Stack gap={1}>
                  <div className="element-11">
                    <div className="content-9">
                      <div className="title-2">
                        <div className="text-wrapper-14">C.H.E.E.R. Works</div>
                      </div>
                      <p className="text-wrapper-15">
                        Assisted employment for members providing an opportunity to gain job skills and
                        income considering differing abilities.
                      </p>
                    </div>
                  </div>
                  <div className="element-13">
                    <div className="content-10">
                      <div className="title-2">
                        <div className="text-wrapper-16">C.H.E.E.R. Group</div>
                      </div>
                      <p className="text-wrapper-17">
                        Social, recreation, leisure, and friendship program for young adults with intellectual
                        disabilities
                      </p>
                    </div>
                  </div>
                  <div className="element-11">
                    <div className="content-9">
                      <div className="title-2">
                        <div className="text-wrapper-18">C.H.E.E.R. Living</div>
                      </div>
                      <p className="text-wrapper-15">
                        An opportunity to practice independent living skills and living with minimal supports.
                      </p>
                    </div>
                  </div>
                  <div className="element-14">
                    <div className="content-9">
                      <div className="title-2">
                        <div className="text-wrapper-19">C.H.E.E.R. Connections</div>
                      </div>
                      <p className="text-wrapper-15">
                        Caregiver social and support group, creators and administrators of all things C.H.E.E.R.
                      </p>
                    </div>
                  </div>
                </Stack>
                :
                <div className="content-8">
                  <Row>
                    <div className="element-10">
                      <Col>
                        <div className="element-11">
                          <img className="element-12" alt="Element" src="https://c.animaapp.com/lPCECV6H/img/2-59@2x.png" />
                          <div className="content-9">
                            <div className="title-2">
                              <div className="text-wrapper-14">C.H.E.E.R. Works</div>
                            </div>
                            <p className="text-wrapper-15">
                              Assisted employment for members providing an opportunity to gain job skills and
                              income considering differing abilities.
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="element-13">
                          <img className="img-2" alt="Element" src="https://c.animaapp.com/lPCECV6H/img/1-81819@2x.png" />
                          <div className="content-10">
                            <div className="title-2">
                              <div className="text-wrapper-16">C.H.E.E.R. Group</div>
                            </div>
                            <p className="text-wrapper-17">
                              Social, recreation, leisure, and friendship program for young adults with intellectual
                              disabilities
                            </p>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Row>
                  <Row>
                    <div className="element-10">
                      <Col>
                        <div className="element-11">
                          <div className="content-9">
                            <div className="title-2">
                              <img className="img-2" alt="Image" src="https://c.animaapp.com/lPCECV6H/img/image-7@2x.png" />
                              <div className="text-wrapper-18">C.H.E.E.R. Living</div>
                            </div>
                            <p className="text-wrapper-15">
                              An opportunity to practice independent living skills and living with minimal supports.
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="element-14">
                          <div className="content-9">
                            <div className="title-2">
                              <img
                                className="cheer-connections"
                                alt="Cheer connections"
                                src="https://c.animaapp.com/lPCECV6H/img/cheer-connections--1@2x.png"
                              />
                              <div className="text-wrapper-19">C.H.E.E.R. Connections</div>
                            </div>
                            <p className="text-wrapper-15">
                              Caregiver social and support group, creators and administrators of all things C.H.E.E.R.
                            </p>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </Row>
                </div>
              }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Container>
  );
};
