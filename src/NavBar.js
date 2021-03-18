import React from 'react'
import './App.css';
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Etusivu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/components">Komponentit</Link>
            </li>



      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
          Oheislaitteet
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Näppäimistöt</a>
          <a className="dropdown-item" href="#">Hiiret</a>
          <a className="dropdown-item" href="#">Kuulokkeet</a>
          <a className="dropdown-item" href="#">Kaiuttimet</a>
          <a className="dropdown-item" href="#">Näytöt</a>
        </div>
      </li>






            <li className="nav-item">
              <Link className="nav-link" to="account">Tili</Link>
              
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="contactus">Ota yhteyttä</Link>
            </li>
          </ul>
          <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>

      </nav>

      
    )
}