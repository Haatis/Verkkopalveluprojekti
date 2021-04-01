import React from 'react';
import { useState, useEffect } from "react";

export default function Order() {
    const [show, setShow]=useState(false)
    const [items, setItems] = useState([]);
    const URL = "HTTP://localhost/verkkokauppa/";


    const cart = localStorage.getItem("cart");
    let arr = JSON.parse(cart);

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
                            setItems(response);
                        } else {
                            alert(response.error);
                        }
                    },
                    (error) => {
                        alert(error);
                    }
                );
        }
    }, []);


    //laskee kokonaishinnan

    const numbers = items.map((item) => Number(item.hinta))
    const amounts = Object.values(counts)
    let arr2 = []
    for (let i = 0; i < amounts.length; i++) {
        arr2[i] = numbers[i] * amounts[i]
    }
    let sum = arr2.reduce((a, b) => a + b, 0)
    console.log(sum)

    return (
        <>
       <div className="row bg-light">
            <div className="col-6">
        <form>
        
  
      <h4 className="m-3">Toimitusosoite</h4>
      <div className="row">
<div class="mb-3 col-5">
    <label for="nimi" class="form-label">Etu- ja sukunimi</label>
    <input type="text" placeholder="Etu ja sukunimi" class="form-control col-2" id="nimi"/>
    
  </div>
  <div class="mb-3 col-5">
    <label for="puhelin" class="form-label ">Puhelin</label>
    <input type="text" placeholder="Puhelin" class="form-control" id="puhelin"/>
  </div>
  </div>
  <div className="row">
  <div class="mb-3 col-5">
    <label for="osoite" class="form-label">Katuosoite</label>
    <input type="text" placeholder="Katuosoite" class="form-control" id="osoite"/>
  </div>
  <div class="mb-3 col-5">
    <label for="posti" class="form-label">Postinumero</label>
    <input type="text" placeholder="Postinumero" class="form-control" id="posti"/>
  </div>
  </div>

   <div class="mb-3 col-10">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <h4>Toimitustapa</h4>
    <input type="radio" class="btn-check" name="kuljetus" id="kotiin" autocomplete="off"/>
    <label class="btn btn-outline-secondary" for="kotiin">Kotiinkuljetus</label>

    <input type="radio" class="btn-check" name="kuljetus" id="myymälään" autocomplete="off"/>
    <label class="btn btn-outline-secondary ms-2" for="myymälään">Nouto lähimmästä myymälästä</label><br></br>

    <h4 className="mt-4">Maksutapa</h4>

  <input type="radio" class="btn-check" name="maksu" id="pankki" autocomplete="off"/>
    <label class="btn btn-outline-secondary" for="pankki">Verkkopankki</label>

    <input type="radio" class="btn-check" name="maksu" id="kortti" autocomplete="off"/>
    <label class="btn btn-outline-secondary ms-2" for="kortti">Korttimaksu</label><br></br>
        
        
  <button type="submit" class="btn btn-primary my-4">Submit</button>
  
  
  
  
  

  
    </form>
    </div>
    <div className="col-5 mt-5"><ul className="text-center d-flex flex-column">
                {items.map((item) => (
                    <li key={item.id} className="border-top border-3 mt-2" href={"/Product/" + item.id}>
                        
                        <div>
                            <img src={item.kuva} className="img-fluid col-1 float-start" alt="Logo" />
                            <h2 className="float-start">{item.tuotenimi}</h2>
                        </div>
                        <h2 className="text-danger float-end">
                            {(counts[item.id] * item.hinta).toLocaleString("fi-FI")} €
                        </h2>
                        <h3 className="float-end">
                            {counts[item.id]} X {item.hinta.toLocaleString("fi-FI")}€
                        </h3>
                        

                    </li>
                ))}
                         <h2 className="">
                            Yhteensä:
                        </h2>
                        <h2 className="text-primary">
                           {sum}€
                        </h2>
            </ul></div>
  </div>
    
        </>
    )
}