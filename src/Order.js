import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';  
import userEvent from '@testing-library/user-event';

export default function Order() {
    const [show, setShow]=useState(false)
    const [items, setItems] = useState([]);
    const [nimi, setNimi] = useState('');
    const [puhelin, setPuhelin] = useState('');
    const [osoite, setOsoite] = useState('');
    const [sähköposti, setSähköposti] = useState('');
    const [posti, setPosti] = useState('');
    const [kuljetus, setKuljetus] = useState('');
    const [maksu, setMaksu] = useState('');
    const [hinta, setHinta] = useState('');
    const [id, setId] = useState('');
    const [tuotenro, setTuotenro] = useState([]);
    const [kpl, setKpl] = useState([]);
    const [user, setUser] = useState([]);

    const URL = "HTTP://localhost/verkkokauppa/";


    const cart = localStorage.getItem("cart");
    let arr = JSON.parse(cart);

    useEffect(() => {
        if ("user" in localStorage) {
          setUser(JSON.parse(localStorage.getItem("user")))
        }
      }, [])
    //poistaa cartin localstoragesta jos se on tyhjä, muuten näyttää virhettä fetchissä
    if ("cart" in localStorage) {
        if (arr.length === 0) {
            localStorage.removeItem("cart");
        }
    }


    //laskee uniikkien arvojen määrän
    var counts = {};
    if ("cart" in localStorage) {
        for (var i = 0; i < arr.length; i++) {
            counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        }
    }



    useEffect(() => {
        if ("cart" in localStorage) {
            //hakee ostoskori tuotteet tietokannasta
            let status = 0;
            fetch(URL + "cart.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    search: arr,
                }),
            })
                .then((response) => {
                    status = parseInt(response.status);
                    return response.json();
                })
                .then(
                    (response) => {
                        if (status === 200) {
                            setItems(response)
                            for (let i = 0; i < response.length; i++) {
                                tuotenro.push(response[i].id)
                                kpl.push(counts[response[i].id])
                                }
                        } else {
                            alert(response);
                        }
                    },
                    (error) => {
                        alert(error);
                    }
                );
        }
    }, []);


    //laskee kokonaishinnan

    const numbers = items.map((item) => Number(item.alennettuhinta ? item.alennettuhinta : item.hinta))
    const amounts = Object.values(counts)
    let arr2 = []
    for (let i = 0; i < amounts.length; i++) {
        arr2[i] = numbers[i] * amounts[i]
    }
    let sum = arr2.reduce((a, b) => a + b, 0) + "€"

    const tilaa = (e) => {
        e.preventDefault();
        let kayttaja = user[0]
         axios.post('http://localhost/verkkokauppa/order.php', {
          nimi:nimi,
          puhelin:puhelin,
          osoite:osoite,
          sahkoposti:sähköposti,
          posti:posti,
          kuljetus:kuljetus,
          maksu:maksu,
          hinta:sum,
          kayttajanimi:kayttaja,
        }

        ).then((response) => {
             console.log(response.data)
             for (let i = 0; i < items.length; i++) {
             axios.post('http://localhost/verkkokauppa/orderinfo.php', {
              id:(response.data),
              tuotenro:tuotenro[i],
              kpl:kpl[i],
            }
           
           
           ).then((response) => {
                console.log(response);
                localStorage.removeItem("cart")
                alert("Tilaus onnistui")
                window.location.href = "http://localhost:3000"
                
            });}
             
         })
         
    };

    return (
        <>
       <div className="row bg-light">
            <div className="col-6">
        <form>
        
  
      <h4 className="m-3">Toimitusosoite</h4>
      <div className="row">
<div class="mb-3 col-5">
    <label for="nimi" class="form-label">Etu- ja sukunimi</label>
    <input onChange={(e) => setNimi(e.target.value)} type="text" placeholder="Etu ja sukunimi" class="form-control col-2" id="nimi"/>
    
  </div>
  <div class="mb-3 col-5">
    <label for="puhelin" class="form-label ">Puhelin</label>
    <input onChange={(e) => setPuhelin(e.target.value)} type="text" placeholder="Puhelin" class="form-control" id="puhelin"/>
  </div>
  </div>
  <div className="row">
  <div class="mb-3 col-5">
    <label for="osoite" class="form-label">Katuosoite</label>
    <input onChange={(e) => setOsoite(e.target.value)} type="text" placeholder="Katuosoite" class="form-control" id="osoite"/>
  </div>
  <div class="mb-3 col-5">
    <label for="posti" class="form-label">Postinumero</label>
    <input onChange={(e) => setPosti(e.target.value)} type="text" placeholder="Postinumero" class="form-control" id="posti"/>
  </div>
  </div>

   <div class="mb-3 col-10">
    <label for="exampleInputEmail1" class="form-label">Sähköpostiosoite</label>
    <input onChange={(e) => setSähköposti(e.target.value)} type="email" placeholder="Sähköpostiosoite" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <h4>Toimitustapa</h4>
    <input onChange={(e) => setKuljetus(e.target.value)} type="radio" class="btn-check" value="kotiinkuljetus" name="kuljetus" id="kotiin" autocomplete="off"/>
    <label  class="btn btn-outline-secondary" for="kotiin">Kotiinkuljetus</label>

    <input onChange={(e) => setKuljetus(e.target.value)} type="radio" class="btn-check" value="myymäläänkuljetus" name="kuljetus" id="myymälään" autocomplete="off"/>
    <label class="btn btn-outline-secondary ms-2" for="myymälään">Nouto lähimmästä myymälästä</label><br></br>

    <h4 className="mt-4">Maksutapa</h4>

  <input onChange={(e) => setMaksu(e.target.value)} type="radio" class="btn-check" name="maksu" value="verkkopankki" id="pankki" autocomplete="off"/>
    <label class="btn btn-outline-secondary" for="pankki">Verkkopankki</label>

    <input onChange={(e) => setMaksu(e.target.value)} type="radio" class="btn-check" name="maksu" value="korttimaksu" id="kortti" autocomplete="off"/>
    <label class="btn btn-outline-secondary ms-2" for="kortti">Korttimaksu</label><br></br>
        
        
  <button type="submit" onClick={tilaa} class="btn btn-primary my-4">Submit</button>
  
  
  
  
  

  
    </form>
    </div>
    <div className="col-5 mt-5"><ul className="text-center d-flex flex-column">
                {items.map((item) => (
                    <li key={item.id} className="border-top border-3 mt-2" href={"/Product/" + item.id}>
                        
                        <div>
                            <img src={item.kuva} className="tuotekuva" alt="Logo" />
                            <h2 className="">{item.tuotenimi}</h2>
                        </div>
                        
                        <h3 className="">
                            {counts[item.id]} X  { item.alennettuhinta ? <><del>{item.hinta + "€"}</del>
                <h4 className="discount">{item.alennettuhinta + "€"}</h4>
                <h6 className="percent">{"-"+ Number((item.hinta - item.alennettuhinta)/item.hinta * 100).toFixed(0) + "%"}</h6></>
                :<h3 className="inline">{item.hinta + "€"}</h3>}
                        </h3>
                        <h2 className="">
                        ={ item.alennettuhinta ? (counts[item.id] *  item.alennettuhinta).toLocaleString("fi-FI")
                        :    (counts[item.id] *  item.hinta).toLocaleString("fi-FI")             }€
                        </h2>
                    </li>
                ))}
                         <h2 className="">
                            Yhteensä:
                        </h2>
                        <h2 className="text-primary">

                           {sum}
                        </h2>
            </ul></div>
  </div>
    
        </>
    )
}