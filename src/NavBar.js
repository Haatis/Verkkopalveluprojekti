import React from 'react'
import './App.css';
import { Link } from 'react-router-dom'
import logo from './img/commsv2.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";


export default function NavBar() {

  const [search, setSearch] = useState("")
  const URL = "HTTP://localhost/verkkokauppa/"


  function searchItem(e) {
    e.preventDefault();
    let status = 0
    fetch(URL + "search.php", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        search: search
      })
    })
      .then(response => {
        status = parseInt(response.status);
        return response.json();
      })
  }


  const [showOheis, setshowOheis] = useState(false);
  const [showKomp, setshowKomp] = useState(false);
  const showOheisDropdown = (e) => {
    setshowOheis(!showOheis);
  }

  const showKompDropdown = (e) => {
    setshowKomp(!showKomp);
  }

  const hideKompDropdown = (e) => {
    setshowKomp(false);
  }

  const hideOheisDropdown = (e) => {
    setshowOheis(false);
  }

  return (
    <>

      <div className="row">
        <img src={logo} className="comms col-12 commslogo img-fluid" alt="Logo" />
        <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" className="mx-1 expand">Etusivu</Nav.Link>
              <NavDropdown href="#action/3.1" title="Komponentit" id="collasible-nav-dropdown" className="mx-1"
                show={showKomp}
                onMouseEnter={showKompDropdown}
                onMouseLeave={hideKompDropdown}>
                <NavDropdown.Item href="/Category/Prosessorit">Prosessorit</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Emolevyt">Emolevyt</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Näytönohjaimet">Näytönohjaimet</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Asemat">Asemat</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Muistit">Muistit</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Kovalevyt">Kovalevyt</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Jäähdytys">Jäähdytys</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Kotelot">Kotelot</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Oheislaitteet" id="collasible-nav-dropdown  " className="mx-1"
                show={showOheis}
                onMouseEnter={showOheisDropdown}
                onMouseLeave={hideOheisDropdown}>
                <NavDropdown.Item href="/Category/Näppäimistöt">Näppäimistöt</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Hiiret">Hiiret</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Näytöt">Näytöt</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="mx-1" href="#">Tili</Nav.Link>
              <Nav.Link className="mx-1" href="/ContactUs.js">Ota yhteyttä</Nav.Link>
              <Nav.Link href="/search" className="mx-1">Haku<i class="fas fa-search ms-2"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  )
}