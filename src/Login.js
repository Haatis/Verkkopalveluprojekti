import React, { useState, useEffect } from 'react';
import axios from 'axios';  


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viesti, setViesti] = useState([]);
  const [loginStatus, setLoginStatus] = useState('');
  const [user, setUser] = useState([])


    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/login.php', {
            username: username,
            password: password,
        }).then((response) => {

          if ((response.data.id)>0) {
            addToUser(response.data.username)
          } else {
            setLoginStatus("hommat kusi")
            
            
          }
             console.log(response.data);
             });
    };

    useEffect(() =>{
      if("user" in localStorage){
          setUser(JSON.parse(localStorage.getItem("user")))
      }
  }, [])
  
  function addToUser(item){
      const newUser = [...user, item];
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      window.location.reload(false);
  }

  function emptyUser() {
    localStorage.clear("user")
    window.location.reload(false);
  }
  

  return (
    <>
    

    <form className="bg-light">
          <div className="row">
          <label for="exampleEmail" sm={2}>Username</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setUsername(e.target.value)} type="text" required/>
          </div>
        </div>
        <div className="row">
          <label for="examplePassword" sm={2}>Password</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setPassword(e.target.value)} type="text" required/>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-10" >
            <button type="submit" value="Submit" onClick={login}>kirjaudu</button>
             <a className="ms-5" href="./register">Luo uusi käyttäjä</a>
          </div>
        </div>
        <h1>
      </h1>
      
      <div>
    <h1>{user}</h1>
    <h1>{loginStatus}</h1>
    {("user" in localStorage) &&<button className="ms-5" type="button" onClick={() => emptyUser()}>Kirjaudu ulos</button>}
   </div>

      </form>
   </>

  );
}

