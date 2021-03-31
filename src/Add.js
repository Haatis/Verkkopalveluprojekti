import React, { useState, useEffect } from 'react';
import axios from 'axios';  


export default function Add() {
  const [tuotenimi, setTuotenimi] = useState('');
  const [hinta, setHinta] = useState('');
  const [tuotetiivistelma, setTuotetiivistelma] = useState('');
  const [tuotekuvaus, setTuotekuvaus] = useState('');
  const [id, setId] = useState('');
  const [kuva, setKuva] = useState('');
  const [kategoria, setKategoria] = useState('');
  const [luokka, setLuokka] = useState('');
  const [viesti, setViesti] = useState('');
  const [items, setItems] = useState([]);
   const [user, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [admin, setAdmin] = useState([]);
  const URL = "http://localhost/verkkokauppa/";
    
  useEffect(() => {
    let status = 0;
    fetch(URL + "index.php")
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
}, []);



useEffect(() =>{
  if("admin" in localStorage) {
    alert("Ylläpitäjänä voit lisätä/poistaa/muokata tuotteita")
  } else {
    alert("Et ole kirjautunut ylläpitäjänä")
    window.location.href = "http://localhost:3000/"
} 
}, [])

function addToUser(item){
const newUser = [...user, item];
setUser(newUser);
localStorage.setItem("user", JSON.stringify(newUser));
window.location.reload(false);
}

function addToAdmin(item){
  const newAdmin = [...admin, item];
  setAdmin(newAdmin);
  localStorage.setItem("admin", JSON.stringify(newAdmin));
  window.location.reload(false);
}

function emptyUser() {
localStorage.clear("user")
window.location.reload(false);
alert("Olet nyt kirjautunut ulos")
}

  const add = (e) => {
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
           window.location.href = "http://localhost:3000/add"
        });
    };

    function remove(id) {
      axios.post('http://localhost/verkkokauppa/delete.php', {
        id:id,
      }).then((response) => {
          console.log(response);
          window.location.href = "http://localhost:3000/add"
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
      <div className="row">
      {items.map((item) => (
        <div className="card col-xl-3 col-lg-6 col-md-6 col-sm-12 text-center" key={item.id}>
                    <a href={"/Product/" + item.id}>
                        <div >
                            <img src="" className="card-img-top" alt=""></img>
                            <div className="card-body">
                            <img src={item.kuva} className="tuotekuva" alt="Logo" />
                                <h5 className="card-title">{item.tuotenimi}</h5>
                                <p className="card-text text-left">{item.tuotetiivistelmä}</p>
                                
                               <div className="vasen-pohja">
                                <a href="#" className="btn btn-primary"><i className="fa fa-shopping-cart"></i></a>
                                </div>
                                <div className="oikea-pohja">
                                <p>{item.hinta + "€"}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    <button className="delete" onClick={() => remove(item.id)} href="#">Delete</button>
                    <a  href={"/Edit/" + item.id} ><button className="edit" >Edit</button></a>
                </div>
                
                 ))}
        </div>
    </div>

    
  );
}

