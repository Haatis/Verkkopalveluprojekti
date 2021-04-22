import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function Register({ URL }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [etunimi, setEtunimi] = useState(null)
  const [sukunimi, setSukunimi] = useState(null)
  const [osoite, setOsoite] = useState(null)
  const [postinro, setPostinro] = useState(null)
  const [kunta, setKunta] = useState(null)
  const [puh, setPuh] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const formData = new FormData();

  let history = useHistory();


  function register(e) {
    e.preventDefault();
    let status = 0;
    if (password != confirmPassword) {
      alert("Salasanat eivät täsmää!")
    } else {
      fetch(URL + "register.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          etunimi: etunimi,
          sukunimi: sukunimi,
          osoite: osoite,
          postinro: postinro,
          kunta: kunta,
          puh: puh
        }),
      })
        .then((response) => {
          status = parseInt(response.status);
          return response.json();
        })
        .then(
          (response) => {
            if(status === 200){
              if (response.message === "success") {
                alert("Tilin luonti onnistui")

// kirjautuu sisään automaattisesti (ei toimi)
/*
                formData.append('username',email);
                formData.append('password',password);
            
                const config = {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Accept' : 'application/json',
                  },
                  body: formData
                }
                fetch(URL + 'login.php',config);
*/


                history.push("/")
              } else{
                alert("Tämä sähköpostiosoite on jo käytössä toisella tilillä")
              }
            }else{
              alert(response.error)
            }
          },
          (error) => {
            alert(error);
          }
        );
    }
  }

  return (
    <div className="row bg-light justify-content-center">
      <form className="bg-light row" onSubmit={register}>
        <p className="mt-3 mb-0 text-end">Tähdellä merkityt kentät ovat pakollisia</p>
        <div className="col-6">
          <div className="">
            <label className="form-label" for="email">Sähköpostiosoite <span id="requiredForm">*</span></label>
            <input className="form-control" type="email" id="email" required
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="my-3 mb-0">
            <label className="form-label" for="password">Salasana <span id="requiredForm">*</span></label>
            <input className="form-control" type="password" id="password" minLength="6" required
              onChange={e => setPassword(e.target.value)} />
          </div>
          <p>Salasanan pitää olla vähintään 6 merkkiä pitkä.</p>
          <div className="my-3">
            <label className="form-label" for="confirmPassword">Vahvista salasana <span id="requiredForm">*</span></label>
            <input className="form-control" type="password" id="confirmPassword" minLength="6" required
              onChange={e => setConfirmPassword(e.target.value)} />
          </div>

          <div className="row">
            <div className="col-5">
              <label className="form-label" for="etunimi">Etunimi <span id="requiredForm">*</span></label>
              <input className="form-control" type="text" id="etunimi" required
                onChange={e => setEtunimi(e.target.value)} />
            </div>
            <div className="col-7">
              <label className="form-label" for="sukunimi">Sukunimi <span id="requiredForm">*</span></label>
              <input className="form-control" type="text" id="sukunimi" required
                onChange={e => setSukunimi(e.target.value)} />
            </div>
          </div>

        </div>

        <div className="col-6">


          <div className="mb-3">
            <label className="form-label" for="osoite">Osoite</label>
            <input className="form-control" type="text" id="osoite"
              onChange={e => setOsoite(e.target.value)} />
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <label className="form-label" for="postinro">Postinumero</label>
              <input className="form-control" type="text" id="postinro" minLength="5"
                onChange={e => setPostinro(e.target.value)} />
            </div>
            <div className="col-8">
              <label className="form-label" for="kunta">Kunta</label>
              <input className="form-control" type="text" id="kunta"
                onChange={e => setKunta(e.target.value)} />
            </div>
          </div>

          <div className="">
            <label className="form-label" for="puh">Puhelinnumero</label>
            <input className="form-control" type="tel" id="puh" maxLength="15"
              onChange={e => setPuh(e.target.value)} />
          </div>
        </div>
        <div className="text-end mt-0">
          <button className="btn btn-primary my-4">Rekisteröidy</button>
        </div>



      </form>


    </div>


  );
}

