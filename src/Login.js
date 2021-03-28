import React, { useState, useEffect } from 'react';
import axios from 'axios';  


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viesti, setViesti] = useState('');
 

 

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/login.php', {
            username: username,
            password: password,
        }).then((response) => {
             console.log(response);
             /*if(){
              alert("kirjautuminen onnistui")
            } else {
              alert("kirjautuminen epäonnistui")
            } */
            
        });
    };

    

  return (
    <div>


      <form className="bg-light">
        <div className="row">
          <label for="exampleEmail" sm={2}>Username</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setUsername(e.target.value)} type="text" />
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Password</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setPassword(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
        <div className="col-sm-10" >
            <button onClick={login}>kirjaudu</button>
            <a className="ms-5" href="./register">Luo uusi käyttäjä</a>
          </div>
        </div>
      </form>

    </div>

    
  );
}

