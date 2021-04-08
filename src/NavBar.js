import React from 'react'
import './App.css';
import logo from './img/commsv2.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'


export default function NavBar({URL, myCart, emptyCart}) {
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');


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
  let cart = localStorage.getItem("cart")
  let arr = JSON.parse(cart)
  let counts = {};



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
  }, [myCart])

  const login = (e) => {
    e.preventDefault();
    axios.post('http://localhost/verkkokauppa/login.php', {
      username: username,
      password: password,
    }).then((response) => {

      if ((response.data.id) > 0) {
        addToUser(response.data.username)
      } else {
        setLoginStatus("hommat kusi")


      }
      console.log(response.data);
    });
  };

  useEffect(() => {
    if ("user" in localStorage) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])

  function addToUser(item) {
    const newUser = [...user, item];
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    window.location.reload(false);
  }

  function emptyUser() {
    localStorage.clear("user")
    window.location.reload(false);
    alert("Olet nyt kirjautunut ulos")
  }

  return (
    <>

      <div className="row">
        <Link to="/"><img src={logo} className="comms col-12 commslogo img-fluid" alt="Logo" /></Link>

        <Navbar collapseOnSelect expand="lg" className="color-nav py-0 px-0" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto d-flex">
              {/* <Nav.Link href="/" className="mx-1">Etusivu</Nav.Link> */}
              <Nav.Link as={Link} to="/Class/komponentit" className="ms-1">
                komponentit
              </Nav.Link>
              <NavDropdown title="" id="collasible-nav-dropdown" className=""
                show={showKomp}
                onMouseEnter={showKompDropdown}
                onMouseLeave={hideKompDropdown}>
                <NavDropdown.Item>
                  <Link to="/Category/Prosessorit">Prosessorit</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Category/Emolevyt">Emolevyt</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Category/Näytönohjaimet">Näytönohjaimet</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Category/Asemat">Asemat</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Category/Muistit">Muistit</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Category/Kovalevyt">Kovalevyt</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Category/Jäähdytys">Jäähdytys</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/Category/Kotelot">Kotelot</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <div className="border border-dark my-0 py-0"></div>
              <Nav.Link as={Link} to="/Class/oheislaitteet" className="ms-1">
                Oheislaitteet
                </Nav.Link>
              <NavDropdown title="" id="collasible-nav-dropdown  " className="mx-1"
                show={showOheis}
                onMouseEnter={showOheisDropdown}
                onMouseLeave={hideOheisDropdown}>

                <NavDropdown.Item>
                  <Link to="/Category/Näppäimistöt">Näppäimistöt</Link>
                </NavDropdown.Item>


                <NavDropdown.Item>
                  <Link to="/Category/Hiiret">Hiiret</Link>
                </NavDropdown.Item>


                <NavDropdown.Item>
                  <Link to="/Category/Näytöt">Näytöt</Link>
                </NavDropdown.Item>

              </NavDropdown>
              <div className="border border-dark my-0 py-0"></div>
              <Nav.Link className="mx-1" href="#">Tili</Nav.Link>
              <div className="border border-dark my-0 py-0"></div>

              <div className="my-0 py-0"></div>
              <form className="d-flex float-end">
                <input className="form-control mx-2 my-2" type="search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />

                <Link to={"/search?query=" + search}>
                  <button className="btn bt btn-primary my-2 py-2 text-light">
                    Search
              </button>
                </Link>

              </form>
              <NavDropdown title="Ostoskori" id="collasible-nav-dropdown" className="mx-1">

                {items.map((item) => (
                  <NavDropdown.Item key={item.id} className="border" as={Link} to={"/Product/" + item.id}>
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
                <Link to="/cart" className="btn btn-primary float-end col-6">
                  Kassalle
                </Link>
              </NavDropdown>

              {("user" in localStorage) ? (<Nav.Link onClick={() => emptyUser()} className="mx-1 ms-3 p-2"><i className="fa fa-user-alt me-2 "></i>Kirjaudu ulos <p className="käyttäjä">({user})</p></Nav.Link>) : (
                <Nav.Link as={Link} to="/login" className="mx-1"><i className="fa fa-user-alt me-2 "></i> Kirjaudu sisään</Nav.Link>)}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  )
}