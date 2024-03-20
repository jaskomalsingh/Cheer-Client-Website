import React from "react";
import "../styles/homePage.css";
import "../styles/footer.css";
import Header from "./Header";
import Footer from "./Footer";
import ChatButton from './ChatButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { useMediaQuery } from 'react-responsive';
import rockLogo from '../assets/rock_glen_logo.jpeg';
import algarvaLogo from '../assets/algarva_logo.png' ;
import sunsetLogo from '../assets/sunset_community_foundation_logo.jpg';
import ocLogo from '../assets/ontario_caregiver_logo.png';
import SpeechButton from "./TextToSpeech";

export const HomePage = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  return (
    <Container fluid>
      <div className="home-page">
        
        <div className="div">
          <Header />
          {/* <button id="speakBtn"> aria-label="Speak Text"🔊 Speak</button> */}
          
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
                    Ongoing Living & Learning Inc. is a registered not-for-profit caregiver driven company with three areas
                    of focus: Cheer Group; Cheer Works; Cheer Connections.
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
                      OLLI initially offered support groups, then expanded to include community inclusion with
                      planned special outings each month. Caregivers and community supporters
                      volunteer to help with our initiative.
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
                      Today, OLLI is a leading example in inclusive care, continuously evolving to meet the
                      needs of everyone and their families, staying true to its vision of a community-based supportive
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
                  a nurturing environment for our patients. We uphold these principles in every aspect of our center&#39;s
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
                <p className="text-wrapper-13">Three ways that OLLI can help you</p>
              </div>
              <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>CHEER Group</Accordion.Header>
                  <Accordion.Body>
                    <img className="img-2" alt="Element" src="https://c.animaapp.com/lPCECV6H/img/1-81819@2x.png" />
                    <p>
                      CHEER Group consists of families caring for an adult with higher functioning
                      intellectual disabilities. We pool our resources to share in hiring support
                      workers on a 4:1 ratio.
                    </p>
                    <p>
                      We have the beautiful facilities of Rock Glen Family Resort at our fingertips.
                      This includes an indoor pool, sauna, fitness center, hall, and kitchen. Some
                      of our projects are integrate with the wider community and there are planned
                      special outings each month. We focus on building life skills, social skills, and
                      leisure skills. We aim to build in as much community inclusion as possible with
                      a focus on the “normal”. Attendees must be able to look after their own self-care needs.
                    </p>
                    <p>
                      <b>
                        Availability
                      </b>
                    </p>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Monday</td>
                          <td>8:00-4:00</td>
                        </tr>
                        <tr>
                          <td>Tuesday</td>
                          <td>8:00-4:00</td>
                        </tr>
                        <tr>
                          <td>Wednesday</td>
                          <td>10:00-4:00</td>
                        </tr>
                        <tr>
                          <td>Thursday</td>
                          <td>8:00-4:00</td>
                        </tr>
                        <tr>
                          <td>Friday</td>
                          <td>8:00-4:00</td>
                        </tr>
                        <tr>
                          <td>Saturday</td>
                          <td>CLOSED</td>
                        </tr>
                        <tr>
                          <td>Sunday</td>
                          <td>CLOSED</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>*outing times may differ*</td>
                        </tr>
                      </tbody>
                    </Table>

                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>CHEER Connections</Accordion.Header>
                  <Accordion.Body>
                    <img
                      className="img-2"
                      alt="Cheer connections"
                      src="https://c.animaapp.com/lPCECV6H/img/cheer-connections--1@2x.png"
                    />
                    <p>
                      Cheer Connections is a group of parents and caregivers, we are all in a similar
                      situation, knowing of someone who has a form of disability.
                    </p>
                    <p>
                      Cheer Connections is a group of parents and caregivers, we are all in a similar
                      situation, knowing of someone who has a form of disability. We meet at least
                      once a month to offer each other support and share our knowledge. Our monthly
                      meetings have been funded by the Ontario Caregivers Association, which provided
                      a relaxing day, a nice lunch, and great guest speakers.
                    </p>
                    <p>
                      This group helps reduce
                      isolation for caregivers as well. It is a requirement of the CHEER Group that family
                      members become involved with Cheer Connections.
                    </p>

                    <p>
                      <b>
                        Availability
                      </b>
                    </p>

                    <p>
                      Friday Summer Nights from 5:00-9:00 pm
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>CHEER Works</Accordion.Header>
                  <Accordion.Body>
                    <img className="img-2" alt="Element" src="https://c.animaapp.com/lPCECV6H/img/2-59@2x.png" />
                    <p>
                      CHEER Works employs members of the CHEER Group who have been developing their job skills.
                      There are many different jobs available considering differing abilities.This is a safe and
                      assisted working environment providing paid employment for our community members with
                      intellectual disabilities. Caregivers and community supporters volunteer to help with
                      this initiative.
                    </p>

                    <p>
                      <b>
                        Availability
                      </b>
                    </p>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Monday</td>
                          <td>CLOSED</td>
                        </tr>
                        <tr>
                          <td>Tuesday</td>
                          <td>CLOSED</td>
                        </tr>
                        <tr>
                          <td>Wednesday</td>
                          <td>10:00-8:00</td>
                        </tr>
                        <tr>
                          <td>Thursday</td>
                          <td>10:00-8:00</td>
                        </tr>
                        <tr>
                          <td>Friday</td>
                          <td>10:00-8:00</td>
                        </tr>
                        <tr>
                          <td>Saturday</td>
                          <td>8:00-8:00</td>
                        </tr>
                        <tr>
                          <td>Sunday</td>
                          <td>8:00-8:00</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <p>*Hours may differ for long weekends*</p>
                            <p>*Store opens May 18th 2024*</p>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <p className="text-wrapper-13">Our Partnerships / Key Contributors</p>
              <Container fluid>
                <Row>
                  <Col>
                    <Image className="img-partner" alt="Element" src={rockLogo} fluid />
                    <p>Rock Glen Family Resort</p>
                  </Col>
                  <Col>
                    <Image className="img-partner" alt="Element" src={algarvaLogo} />
                    <p>Algarva 168 Grand Bend</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{}}>
                    <Image className="img-partner"alt="Element" src={sunsetLogo} />
                    <p>Sunset Foundation</p>
                  </Col>
                  <Col>
                    <Image className="img-partner" alt="Element" src={ocLogo} />
                    <p>Ontario Caregivers Association</p>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <Footer />
        </div>
        <SpeechButton />
        <ChatButton />
      </div>
    </Container>
  );
};
