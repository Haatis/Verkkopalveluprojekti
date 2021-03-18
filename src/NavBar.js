import React from 'react'
import './App.css';
import { Link } from 'react-router-dom'
import logo from './img/commss.png';

export default function NavBar() {
  return (
    <>
      <div className="row">
        <img src={logo} className="comms col-12" alt="Logo" />
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary col-12 py-2 border border-dark mx-1">
          <div>

          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ">
              <li className="nav-item active mx-1">
                <Link className="nav-link text-light" to="/">Etusivu</Link>
              </li>


              <li class="nav-item dropdown mx-1">
                <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Komponentit
          </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a class="dropdown-item" href="#">Prosessorit</a></li>
                  <li><a class="dropdown-item" href="#">Emolevyt</a></li>
                  <li><a class="dropdown-item" href="#">Näytönohjaimet</a></li>
                  <li><a class="dropdown-item" href="#">Asemat</a></li>
                  <li><a class="dropdown-item" href="#">Muistit</a></li>
                  <li><a class="dropdown-item" href="#">Kovalevyt</a></li>
                  <li><a class="dropdown-item" href="#">Jäähdytys</a></li>
                  <li><a class="dropdown-item" href="#">Kotelot</a></li>
                </ul>
              </li>

              <li class="nav-item dropdown mx-1">
                <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Oheislaitteet
          </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a class="dropdown-item" href="#">Näppäimistöt</a></li>
                  <li><a class="dropdown-item" href="#">Hiiret</a></li>
                  <li><a class="dropdown-item" href="#">Näytöt</a></li>
                </ul>
              </li>








              <li className="nav-item mx-1">
                <Link className="nav-link text-light" to="account">Tili</Link>

              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link text-light" to="contactus">Ota yhteyttä</Link>
              </li>
            </ul>
            <form class="d-flex mx-5">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn bt text-light" type="submit">Search</button>
            </form>
          </div>

        </nav>
      </div>
    </>
  )
}