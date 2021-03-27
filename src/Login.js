import React, { useState, useEffect } from 'react';
import axios from 'axios';  


export default function Loggingv2() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viesti, setViesti] = useState('');

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/register.php', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
            e.preventDefault();
        });
    };

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/login.php', {
            username: username,
            password: password,
        }).then((response) => {
             console.log(response);
            e.preventDefault();
            
        });
    };

  return (
    <div>

      <form className="bg-light">
        <div className="row">
          <label for="exampleEmail" sm={2}>Username</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setUsernameReg(e.target.value)} type="text" />
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Password</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setPasswordReg(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
        <div className="col-sm-10" >
            <button onClick={register}>rekisteröidy</button>
          </div>
        </div>
      </form>

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
          </div>
        </div>
      </form>

    </div>

    
  );
}

