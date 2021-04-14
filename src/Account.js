import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  

export default function Account(){
    const [user, setUser] = useState([]);
    const [account, setAccount] = useState([]);
    const [tilaukset, setTilaukset] = useState([]);
    const [tuote, setTuote] = useState([]);
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


           const tilaustuote = (tuote) => {
            axios.post('http://localhost/verkkokauppa/orderedproducts.php', {
             search:tuote,
           }
            ).then((response) => {
              console.log(response.data)
             setTuote(response.data)
             
           })}

          
    

    return (
        <div className="row bg-light">
            <h2>Käyttäjän <span className="text-primary">{user}</span> tilisivu</h2>
            <h5 className="mb-4">käyttäjä luotu: {account.added}</h5>
            <h4 >Tilaukset ({tilaukset.length}) -</h4>
           <div className="col-6">
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
                        <div className="mb-4 border-bottom">
                             
                            <h5 className="inline">Tilauspvm : {tilaus.pvm}</h5>
                            <button className="btn-primary inline mb-1 ms-4" onClick={() => tilaustuote(tilaus.id)}>Näytä tuotteet</button>
                        </div>
                    </div>
                ))}
        </div>

        <div className="col-6">
            {tuote.map((tilaus) => (
                    <div key={tilaus.id} >

                        <div>
                            <img src={tilaus.kuva} className="tuotekuva" alt="Logo" />
                        </div>
                    
                        <div className="mb-4 border-bottom">
                            <h5 className="">Kpl: {tilaus.kpl}</h5>
                        </div>
                    </div>
                ))}
        </div>
       

        </div>
    )
}