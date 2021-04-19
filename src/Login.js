import React, { useState, useEffect } from 'react';


export default function Login({URL, setUser}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState([]);
  const [viesti, setViesti] = useState([]);
  const [loginStatus, setLoginStatus] = useState('');
    
  async function login(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('username',username);
    formData.append('password',password);

    const config = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept' : 'application/json',
      },
      body: formData
    }

    const response = await fetch(URL + 'login.php',config);
    const json = await response.json();

    if (response.ok) {
      setUser(json);
    } else {
      alert("Error logging in.");
    }

  }


  return (
    <>
    
    <form className="bg-light row" onSubmit={login}>
      <div className="ms-lg-5 mt-lg-3 ms-sm-2 mt-sm-1">
          <div className="row">
          <label for="exampleEmail" sm={2}>Käyttäjänimi</label>
          <div className="col-sm-5 col-md-5 col-lg-3" >
          <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} type="text" required/>
          </div>
        </div>
        <div className="row">
          <label for="examplePassword" sm={2}>Salasana</label>
          <div className="col-sm-5 col-md-5 col-lg-3" >
            <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-10 mt-2" >
            <button type="submit" value="Submit" className="mb-3 btn btn-warning">Kirjaudu</button>
             <a className="ms-5" href="./register">Luo uusi käyttäjä</a>
             <h3 className="error-in-register col-lg-6">{loginStatus}</h3>
          </div>
        </div>
        </div>
      </form>
   </>

  );
}

