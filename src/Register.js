import React, { useState, useEffect } from 'react';
import axios from 'axios';  


export default function Register() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [viesti, setViesti] = useState('');
 

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/register.php', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
            alert(usernameReg + " rekisteröityminen onnistui!");
            window.location.href = "http://localhost:3000/login";

            

        });
    };
    

  return (
    <div>
      <form className="bg-light" onSubmit={register}>
        <div className="row">
          <label for="exampleEmail" sm={2}>Username</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setUsernameReg(e.target.value)} type="text" required/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Password</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setPasswordReg(e.target.value)} type="password" required/>
          </div>
        </div>

        <div className="row">
        <div className="col-sm-10" >
            <button type="submit" value="Submit">rekisteröidy</button>
          </div>
        </div>
      </form>

    
    </div>

    
  );
}

