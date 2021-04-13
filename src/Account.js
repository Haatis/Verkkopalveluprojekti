import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  

export default function Account(){
    const [user, setUser] = useState([]);
    const [account, setAccount] = useState([]);
    const [tilaukset, setTilaukset] = useState([]);
    const { it } = useParams();
    const URL = "HTTP://localhost/verkkokauppa/"

    useEffect(() => {
        if ("user" in localStorage) {
          setUser(JSON.parse(localStorage.getItem("user")))
          lähetä();
          tilaus();
        }
      }, [])

      const lähetä = (e) => {
         axios.post('http://localhost/verkkokauppa/account.php', {
          search:it,
        }
         ).then((response) => {
             setAccount(response.data[0])
           console.log(response.data[0])
          
          
        })}

        const tilaus = (e) => {
            axios.post('http://localhost/verkkokauppa/orders.php', {
             search:it,
           }
            ).then((response) => {
                setTilaukset(response.data)
              console.log(response.data)
             
             
           })}
   

    

    return (
        <div className="row bg-light">
            <h2>Käyttäjän {user} tilisivu</h2>
            <h5 className="mb-4">käyttäjä luotu: {account.added}</h5>
            <h4>Tilaukset -</h4>
            {tilaukset.map((tilaus) => (
                    <div key={tilaus.id} >
                        
                        <div>
                            <h5 className="">Tilaus id: {tilaus.id}</h5>
                        </div>

                        <div>
                            <h5 className="">Toimitustapa: {tilaus.toimitustapa}</h5>
                        </div>
                    
                        <div>
                            <h5 className="">Maksutapa: {tilaus.maksutapa}</h5>
                        </div>
                        <div>
                            <h5 className="">Hinta :{tilaus.hinta}</h5>
                        </div>
                        <div>
                            <h5 className="">Tilauspvm : {tilaus.pvm}</h5>
                        </div>
                    </div>
                ))}
        
            
        </div>
    )
}