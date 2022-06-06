import React from 'react';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import myPhoto from "../../assets/img/about/my-pic.jpg";
import project1 from "../../assets/img/projects/pare-property.png";
import project2 from "../../assets/img/projects/megacrop.png";
import project3 from "../../assets/img/projects/highroi.png";
import {Col, Container, Row} from "react-bootstrap";
import SectionHeader from "../Common/SectionHeader";

const MyPortfolio = () => {
    return (
        <>
            <Header/>
            <div className='about-section py-80'>
                <Container>
                    <SectionHeader badge={'Portfolio'} title={'My Portfolio'}/>
                    <Row className='align-items-center'>
                        <Col lg={5}>
                            <div className="about-thumb mb-4">
                                <img src={myPhoto} className='img-fluid w-100' alt="my-photo"/>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className="about-content">
                                <ul className='list-unstyled p-0 m-0'>
                                    <li className={'mb-2'}><strong>Name: </strong> Mehedi Hasan Foysal</li>
                                    <li className={'mb-3'}><strong>Email: </strong> mehedifoysal8@gmail.com</li>
                                    <li className={'mb-3'}>
                                        <h4 className='p_color'>Education</h4>
                                        <ul>
                                            <li>
                                                <ul className="list-unstyled ms-0 mt-2">
                                                    <li><strong>Bachelor of Science</strong></li>
                                                    <li>Tejgaon College</li>
                                                    <li>2016-2020</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul className="list-unstyled ms-0 mt-2">
                                                    <li><strong>Higher Secondary School Certificate</strong></li>
                                                    <li>Ramgonj Model College</li>
                                                    <li>2015-2016</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="mb-3">
                                        <h4 className='p_color'>Skills</h4>
                                        <div className='mt-1'>
                                            <span className="badge ic-badge bg-primary m-1">PHP</span>
                                            <span className="badge ic-badge bg-primary m-1">OOP</span>
                                            <span className="badge ic-badge bg-primary m-1">WordPress</span>
                                            <span className="badge ic-badge bg-primary m-1">WooCommerce</span>
                                            <span className="badge ic-badge bg-primary m-1">Rest API</span>
                                            <span className="badge ic-badge bg-primary m-1">React</span>
                                            <span className="badge ic-badge bg-primary m-1">Javascript</span>
                                            <span className="badge ic-badge bg-primary m-1">HTML</span>
                                            <span className="badge ic-badge bg-primary m-1">CSS</span>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <h4 className='p_color'>Experience</h4>
                                        <ul className="list-unstyled ms-0 mt-2">
                                            <li>
                                                <ul className="list-unstyled ms-0 mt-2">
                                                    <li><strong>Full Stack WordPress Developer</strong></li>
                                                    <li>ITclan BD</li>
                                                    <li>06/2019 - Present</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul className="list-unstyled ms-0 mt-2">
                                                    <li><strong>WordPress Developer (Intern)</strong></li>
                                                    <li>Webcode Institute (01/2018 - 12/2018)</li>
                                                    <li>01/2018 - 12/2018</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="recent-projects section-bg py-80">
                <Container>
                    <SectionHeader badge={'Projects'} title={'My Recent Projects'}/>
                    <Row>
                        <Col lg={4} className={'mb-5'}>
                            <a href="https://laratheme.com/pare-property">
                                <img src={project1} alt="Pare-property" className='mb-3 img-fluid w-100 shadow'/>
                            </a>
                            <h4 className="p_color"><a href="https://laratheme.com/pare-property">Pare Property</a></h4>
                            <ul style={{columnCount: 2, columnGap: '20px'}}>
                                <li>WordPress</li>
                                <li>Rest API</li>
                                <li>WPML (Multi language)</li>
                                <li>Javascript</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                        </Col>
                        <Col lg={4} className={'mb-5'}>
                            <a href="https://laratheme.com/megacrop">
                                <img src={project2} alt="Megacrop" className='mb-3 img-fluid w-100 shadow'/>
                            </a>
                            <h4 className="p_color"><a href="https://laratheme.com/megacrop">Megacrop</a></h4>
                            <ul style={{columnCount: 2, columnGap: '20px'}}>
                                <li>WordPress</li>
                                <li>WooCommerce</li>
                                <li>Javascript</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                        </Col>
                        <Col lg={4} className={'mb-5'}>
                            <a href="https://laratheme.com/highroier">
                                <img src={project3} alt="Higheroir" className='mb-3 img-fluid w-100 shadow'/>
                            </a>
                            <h4 className="p_color"><a href="https://laratheme.com/highroier">Higheroir</a></h4>
                            <ul style={{columnCount: 2, columnGap: '20px'}}>
                                <li>WordPress</li>
                                <li>Tailwind</li>
                                <li>Javascript</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default MyPortfolio;