import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom'

export default function Footer() {
    return (
        <div className="row">
        <footer>
            <h5 className="col-12 mb-4 mt-2">Comm's Tietokoneen komponentteja ja oheislaitteita vuodesta 2021.</h5>
            <div className="row col-lg-12 col-md-12 col-sm-12">
                <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                    <p>Asiakaspalvelu</p>
                    <p>Ma-Su &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24/7</p>
                    <hr></hr>
                    <p> <a className="txtwhite" href="tel: +358451374061">+358 45 1374061</a></p>
                    <p> <a className="txtwhite" href="mailto:asiakaspalvelu@comms.fi">asiakaspalvelu@comms.fi</a></p>
                    <Link className="mx-1 text-white mb-sm-3" to="/ContactUs">Ota yhteyttä</Link>

                    
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <p style={{color:"black", fontSize:"20px"}}>Ryhmä 7</p>
                    <p>Joona Haataja</p>
                    <p>Joona Lappalainen</p>
                    <p>Joni Karvonen</p>

                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <p style={{color:"black", fontSize:"20px"}}>Sosiaalinen media</p>
                    <a className="footerlink" href="https://www.facebook.com"> <i className="fab fa-facebook-square">&nbsp;</i>Facebook</a>
                    <a className="footerlink lightblue" href="https://www.twitter.com"><i className="fab fa-twitter-square">&nbsp;</i>Twitter</a>
                    <a className="footerlink red" href="https://www.youtube.com"> <i className="fab fa-youtube-square ">&nbsp;</i>Youtube</a>
                </div>
            </div>
        </footer>
        </div>
    )
}