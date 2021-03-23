import React from 'react'


export default function Footer() {
    return (
        <div class="row">
        <footer>
            <p class="col-12">Comm's Tietokoneen komponentteja ja oheislaitteita vuodesta 2021.</p>
            <div class="row">
                <div class="col-4">
                    <p>Asiakaspalvelu</p>
                    <p>Ma-Su &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24/7</p>
                    <p>+358 45 1374061</p>
                    <p>asiakaspalvelu@comms.fi</p>
                </div>
                <div class="col-4">
                    <p>Ryhmä 7</p>
                    <p>Joona Haataja</p>
                    <p>Joona Lappalainen</p>
                    <p>Joni Karvonen</p>
                    <p >Roope Puhakka</p>
                    <p>Waltteri Ylisirniö</p>
                </div>
                <div class="col-4">
                    <p>Sosiaalinen media</p>
                    <a class="footerlink" href="https://www.facebook.com"> <i class="fab fa-facebook-square">&nbsp;</i>Facebook</a>
                    <a class="footerlink" href="https://www.twitter.com"><i class="fab fa-twitter-square">&nbsp;</i>Twitter</a>
                    <a class="footerlink" href="https://www.youtube.com"> <i class="fab fa-youtube-square">&nbsp;</i>Youtube</a>
                </div>
            </div>
        </footer>
        </div>
    )
}