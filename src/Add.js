import React, { useState, useEffect } from 'react';
import axios from 'axios';  


export default function Add() {
  const [tuotenimi, setTuotenimi] = useState('');
  const [hinta, setHinta] = useState('');
  const [tuotetiivistelma, setTuotetiivistelma] = useState('');
  const [tuotekuvaus, setTuotekuvaus] = useState('');
  const [kuva, setKuva] = useState('');
  const [kategoria, setKategoria] = useState('');
  const [luokka, setLuokka] = useState('');
  const [viesti, setViesti] = useState('');

    const add = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/add.php', {
          tuotenimi:tuotenimi,
          hinta:hinta,
          tuotetiivistelma:tuotetiivistelma,
          tuotekuvaus:tuotekuvaus,
          kuva:kuva,
          kategoria:kategoria,
          luokka:luokka,
        }).then((response) => {
            console.log(response);
            alert("Tuotteen lisäys onnistui!");

            

        });
    };
    

  return (
    <div>
      <form className="bg-light">
        <div className="row">
          <label for="exampleEmail" sm={2}>Tuotenimi</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotenimi(e.target.value)} type="text" />
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Hinta</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setHinta(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>tuotetiivistelmä</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotetiivistelma(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>tuotekuvaus</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotekuvaus(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Kuva (url)</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setKuva(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Kategoria</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setKategoria(e.target.value)} type="text"/>
          </div>
        </div>


        <div className="row">
          <label for="examplePassword" sm={2}>Luokka</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setLuokka(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
        <div className="col-sm-10" >
            <button onClick={add}>Lisää tuote</button>
          </div>
        </div>
      </form>

    
    </div>

    
  );
}

