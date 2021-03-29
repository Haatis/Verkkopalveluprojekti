import React from 'react'
import './App.css';
import logo from './img/commsv2.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from "react";

export default function NavBar() {
  const URL = "HTTP://localhost/verkkokauppa/";
  const [search, setSearch] = useState("")
  const [shoppingCartItem, setShoppingCartItem] = useState([])
  const [items, setItems] = useState([])

  function searchItem(e) {
    e.preventDefault();
    window.location.href = "http://localhost:3000/search?query=" + search;
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

  //hakee ostoskorin tiedot localsoragesta
  const cart = localStorage.getItem("cart")
  const arr = JSON.parse(cart)
  var counts = {};

  function emptyCart() {
    localStorage.clear("cart")
    window.location.reload(false);
  }


  //laskee uniikkien arvojen määrän 
  if ("cart" in localStorage) {
    for (var i = 0; i < arr.length; i++) {
      counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
  }

  useEffect(() => {
    if ("cart" in localStorage) {
      //hakee ostoskori tuotteet tietokannasta
      let status = 0;
      fetch(URL + "cart.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          search: arr
        }),
      })
        .then((response) => {
          status = parseInt(response.status);
          return response.json();
        })
        .then(
          (response) => {
            if (status === 200) {
              setItems(response);
            } else {
              alert(response.error);
            }
          },
          (error) => {
            alert(error);
          }
        );
    }
  }, [])

  return (
    <>

      <div className="row">
        <img src={logo} className="comms col-12 commslogo img-fluid" alt="Logo" />
        <Navbar collapseOnSelect expand="lg" className="color-nav py-0 px-0" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto d-flex">
              <Nav.Link href="/" className="mx-1">Etusivu</Nav.Link>
              <div className="border border-dark my-0 py-0"></div>
              <Nav.Link href="/Class/komponentit" className="ms-1">Komponentit</Nav.Link>
              <NavDropdown title="" id="collasible-nav-dropdown" className=""
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
              <div className="border border-dark my-0 py-0"></div>
              <Nav.Link href="/Class/oheislaitteet" className="ms-1">Oheislaitteet</Nav.Link>
              <NavDropdown title="" id="collasible-nav-dropdown  " className="mx-1"
                show={showOheis}
                onMouseEnter={showOheisDropdown}
                onMouseLeave={hideOheisDropdown}>
                <NavDropdown.Item href="/Category/Näppäimistöt">Näppäimistöt</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Hiiret">Hiiret</NavDropdown.Item>
                <NavDropdown.Item href="/Category/Näytöt">Näytöt</NavDropdown.Item>
              </NavDropdown>
              <div className="border border-dark my-0 py-0"></div>
              <Nav.Link className="mx-1" href="#">Tili</Nav.Link>
              <div className="border border-dark my-0 py-0"></div>
              <Nav.Link className="mx-1" href="/ContactUs.js">Ota yhteyttä</Nav.Link>
              <div className="border border-dark my-0 py-0"></div>
              <form className="d-flex float-end" onSubmit={searchItem}>
                <input className="form-control mx-2 my-2" type="search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                <button className="btn bt btn-primary my-2 py-0 text-light" type="submit">Search</button>
              </form>
              <NavDropdown title="Ostoskori" id="collasible-nav-dropdown" className="mx-1">

                {items.map((item) => (
                  <NavDropdown.Item key={item.id} className="border" href={"/Product/" + item.id}>
                    <div>
                      {item.tuotenimi}
                    </div>
                    <div className="float-end text-danger">
                      {(counts[item.id] * item.hinta).toLocaleString("fi-FI")} €
                    </div>
                    <div className="">
                      <p><small>
                        {counts[item.id]} X {(item.hinta).toLocaleString("fi-FI")}€
                      </small></p>
                    </div>
                  </NavDropdown.Item>
                ))}
                <button className="btn btn-danger float-start col-6" type="button" onClick={() => emptyCart()}>Tyhjennä</button>
                <button className="btn btn-primary float-end col-6" type="button" onClick="">Kassalle</button>
              </NavDropdown>
              <Nav.Link href="/login" className="mx-1 ms-3"><i className="fa fa-user-alt me-2 "></i> Kirjaudu sisään</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  )
}