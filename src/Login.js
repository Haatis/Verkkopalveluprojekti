import React, { useState, useEffect } from 'react';
import axios from 'axios';  


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState([]);
  const [viesti, setViesti] = useState([]);
  const [loginStatus, setLoginStatus] = useState('');
  const [user, setUser] = useState([]);


    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/login.php', {
            username: username,
            password: password,
        }).then((response) => {

          if (response.data.oikeudet==='admin'){
            addToUser(response.data.username)
            addToAdmin(response.data.oikeudet)
            alert("sisäänkirjautuminen ylläpitäjänä onnistui")
            window.location.href = "http://localhost:3000/add"
          } else  if ((response.data.id)>0) {
            addToUser(response.data.username)
            alert("sisäänkirjautuminen onnistui")
            window.location.href = "http://localhost:3000/"
          } else {
            setLoginStatus("Väärä salasana/käyttäjänimi")
            
            
          }
             console.log(response.data);
             });
    };

    useEffect(() =>{
      if("user" in localStorage){
          setUser(JSON.parse(localStorage.getItem("user")))
          alert("Olet jo kirjaantunut sisään")
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
             <h1>{loginStatus}</h1>
          </div>
        </div>
     
      </form>
   </>

  );
}

