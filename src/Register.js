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
      <form className="bg-light row" onSubmit={register}>
      <div className="ms-lg-5 mt-lg-3 ms-sm-2 mt-sm-1">
        <div className="row">
          <label for="exampleEmail" sm={2}>Käyttäjänimi</label>
          <div className="col-sm-5 col-md-5 col-lg-3" >
            <input className="form-control" onChange={(e) => setUsernameReg(e.target.value)} type="text" required/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Salasana</label>
          <div className="col-sm-5 col-md-5 col-lg-3" >
            <input className="form-control" onChange={(e) => setPasswordReg(e.target.value)} type="password" required/>
          </div>
        </div>

        <div className="row">
        <div className="col-sm-10 mt-2" >
            <button type="submit" value="Submit" className="mb-3 btn btn-warning">Rekisteröidy</button>
          </div>
        </div>
        </div>
      </form>

    
    </div>

    
  );
}

