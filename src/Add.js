import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
export default function Add({URL, admin, user, setUser}) {
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  
  let history = useHistory();
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
            
        );
}, [items]);

useEffect(() => {
  let status = 0;
      const config = {
      method: 'POST',
      credentials: 'include',
          headers: {
        'Accept' : 'application/json'
      }}
  fetch(URL + "secret.php", config)
      .then((response) => {
        console.log(response)
          if (response.status === 401) {
            alert("et ole kirjautunut sisään")
            history.push('/')
            
          }
          status = parseInt(response.status);
          return response.json();
         
      })
      .then(
        
          (response) => {
            
              if (status === 200) {
                setUser(response);
              
              
                if(response.oikeudet === "admin"){
                 
                  
                  
                }else {
                  alert("et ole kirjautunut ylläpitäjänä")
                  history.push('/')
                  
                  
                } 
              } 
              
          });  ;
} , []);




  function add(e) {
        axios.post('http://localhost/verkkokauppa/add.php', {
          tuotenimi:tuotenimi,
          hinta:hinta,
          tuotetiivistelma:tuotetiivistelma,
          tuotekuvaus:tuotekuvaus,
          kuva:kuva,
          kategoria:kategoria,
          luokka:luokka,
          id:id,
        }).then((response) => {
            
            alert("tuote lisätty")
            history.push('/add')
            
        });
    };

    function remove(id) {
      axios.post('http://localhost/verkkokauppa/delete.php', {
        id:id,
      }).then((response) => {
         
          history.push('/add')
      });
  };

  
 

    
   

  return (
    <div>
      <form className="bg-light row" onSubmit={add}>
        <div className="row">
        <div className="col-2">
          <label for="exampleEmail" sm={2}>Tuotenimi</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotenimi(e.target.value)} type="text" required/>
          </div>
        </div>
        <div className="col-2">
          <label for="examplePassword" sm={2}>Hinta</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setHinta(e.target.value)} type="text" required/>
          </div>
        </div>

        <div className="col-2">
          <label for="examplePassword" sm={2}>tuotetiivistelmä</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotetiivistelma(e.target.value)} type="text" required/>
          </div>
        </div>

        <div className="col-2">
          <label for="examplePassword" sm={2}>tuotekuvaus</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotekuvaus(e.target.value)} type="text" required/>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col-2">
          <label for="examplePassword" sm={2}>Kuva (url)</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setKuva(e.target.value)} type="text" required/>
          </div>
        </div>

        <div className="col-2">
          <label for="examplePassword" sm={2}>Kategoria</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setKategoria(e.target.value)} type="text" required/>
          </div>
        </div>


        <div className="col-2">
          <label for="examplePassword" sm={2}>Luokka</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setLuokka(e.target.value)} type="text" required/>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-10 m-2" >
            <button type="submit">Lisää tuote </button>
          </div>
        </div>

    
      </form>
      <div className="row">
            {items.map((item) => (
        <div
          className="card col-xl-3 col-lg-6 col-md-6 col-sm-12 text-center"
          key={item.id}>
          
            <div className="yläosa">
            <a  href={"/Product/" + item.id} >
              <img src="" className="card-img-top" alt=""></img>
              <div className="card-body">
                <img src={item.kuva} className="tuotekuva" alt="Logo" />
                <h5 className="card-title">{item.tuotenimi}</h5>
                <p className="card-text text-left">{item.tuotetiivistelmä}</p>
                </div>
                </a>
                </div>
                <div className="row align-bottom">
                <div className="vasen-pohja col-6 align-bottom">
                </div>
                <div className="oikea-pohja col-6 mt-2 align-bottom">
                  { item.alennettuhinta ? <><del>{item.hinta + "€"}</del><h5>{item.alennettuhinta + "€" +" -"+ Number((item.hinta - item.alennettuhinta)/item.hinta * 100).toFixed(0) + "%"}</h5></>
                :<h5>{item.hinta + "€"}</h5>}
                  <button className="delete" onClick={() => remove(item.id)} href="#">Delete</button>
                    <Link  to={"/Edit/" + item.id} ><button className="edit" >Edit</button></Link>
                </div>
                </div>
                    
          
        </div>
        
      ))}
            </div>
    </div>

    
  );
}

