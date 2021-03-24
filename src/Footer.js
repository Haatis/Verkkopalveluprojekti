import React from 'react'


export default function Footer() {
    return (
        <div className="row">
        <footer>
            <h5 className="col-12 mb-4">Comm's Tietokoneen komponentteja ja oheislaitteita vuodesta 2021.</h5>
            <div className="row">
                <div className="col-4">
                    <p>Asiakaspalvelu</p>
                    <p>Ma-Su &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24/7</p>
                    <p>+358 45 1374061</p>
                    <p>asiakaspalvelu@comms.fi</p>
                </div>
                <div className="col-4">
                    <p>Ryhmä 7</p>
                    <p>Joona Haataja</p>
                    <p>Joona Lappalainen</p>
                    <p>Joni Karvonen</p>
                    <p >Roope Puhakka</p>
                    <p>Waltteri Ylisirniö</p>
                </div>
                <div className="col-4">
                    <p>Sosiaalinen media</p>
                    <a className="footerlink" href="https://www.facebook.com"> <i className="fab fa-facebook-square">&nbsp;</i>Facebook</a>
                    <a className="footerlink lightblue" href="https://www.twitter.com"><i className="fab fa-twitter-square">&nbsp;</i>Twitter</a>
                    <a className="footerlink red" href="https://www.youtube.com"> <i className="fab fa-youtube-square ">&nbsp;</i>Youtube</a>
                </div>
            </div>
        </footer>
        </div>
    )
}