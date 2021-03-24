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

  function searchItem(e){
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


    





  return (
    <>

      <div className="row">
        <img src={logo} className="comms col-12 commslogo" alt="Logo" />
        <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" className="mx-1">Etusivu</Nav.Link>
              <NavDropdown title="Komponentit" id="collasible-nav-dropdown" className="mx-1">
                <NavDropdown.Item href="#action/3.1">Prosessorit</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Emolevyt</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Näytönohjaimet</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Asemat</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">Muistit</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.6">Kovalevyt</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.7">Jäähdytys</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.8">Kotelot</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Oheislaitteet" id="collasible-nav-dropdown  " className="mx-1">
                <NavDropdown.Item href="#action/3.9">Näppäimistöt</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.10">Hiiret</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.11">Näytöt</NavDropdown.Item>
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