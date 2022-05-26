import React from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = () => {
    return (
        <>
            <Header/>
            <div className="pm-404-section text-center">
                <Container>
                    <div className="pm-404-text">
                        <div className="pm-title">
                            <h2>404</h2>
                            <div className="pm-error">
                                <p>error</p>
                            </div>
                        </div>

                        <div className="pm-404-btn">
                            <h4>Sorry!</h4>
                            <p>The Page You Are Looking For Was Not Found.</p>
                            <Link to={'/'} className="btn-default">Back To Home</Link>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default NotFound;