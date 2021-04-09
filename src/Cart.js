import userEvent from "@testing-library/user-event";
import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

export default function Cart({URL, clearItem, removeItem, addItem, cart}) {
    const [items, setItems] = useState([]);

  //hakee ostoskorin tiedot localsoragesta
  const localCart = localStorage.getItem("cart");
  let arr = JSON.parse(localCart);

  //laskee uniikkien arvojen määrän => näyttää kuinka monta mitäkin tuotetta on
  var counts = {};
  if ("cart" in localStorage) {
    for (var i = 0; i < arr.length; i++) {
      counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
  }


//hakee ostoskorissa olevat tuotteet tietokannasta
    useEffect(() => {
        if ("cart" in localStorage) {
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
    }, [cart]);




    //laskee kokonaishinnan
    const numbers = items.map((item) => Number(item.alennettuhinta ? item.alennettuhinta : item.hinta))
    const amounts = Object.values(counts)
    let arr2 = []
    for (let i = 0; i < amounts.length; i++) {
        arr2[i] = numbers[i] * amounts[i]
    }
    let sum = arr2.reduce((a, b) => a + b, 0)
    //console.log(sum)
  //  { item.alennettuhinta ? (counts[item.id] *  item.alennettuhinta).toLocaleString("fi-FI")
   // :    (counts[item.id] *  item.hinta).toLocaleString("fi-FI")             }


    //jos tuotteiden määrä on 0, poistetaan se näkyvistä
    const id = items.map((item) => Number(item.id))
    for(var i = 0; i < id.length; i++){
          if(typeof counts[id[i]] === "undefined")
          {
              console.log(Number([i]) + 1 +  " on tyhjä")
            }
    }

    return (
        <div className="row bg-secondary">
            <h1>Shopping cart</h1>
            <h5 className="text">Products:</h5>
            <p className="text">
            </p>
            <ul className="text-center d-flex flex-column cartbackground">
                {items.map((item) => (
                    <li key={item.id} className="border-top border-5" href={"/Product/" + item.id}>
                        <button className="btn-sm btn-warning float-start" onClick={() => clearItem(item.id)} value={item.id}>
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button className="btn-sm btn-warning float-start" onClick={() => addItem(item.id)} value={item.id}>
                            <i class="fa fa-plus-square"></i>
                        </button>
                        <button className="btn-sm btn-warning float-start" onClick={() => removeItem(item.id)} value={item.id}>
                            <i class="fa fa-minus-square"></i>
                        </button>
                        <div className="cartbackground">
                            <img src={item.kuva} className="img-fluid col-1 float-start" alt="Logo" />
                            <h1 className="float-start carttext">{item.tuotenimi}</h1>
                        </div>
                       
                        <h2 className="ms-4 txtwhite float-end">
                        ={ item.alennettuhinta ? (counts[item.id] *  item.alennettuhinta).toLocaleString("fi-FI")
                        :    (counts[item.id] *  item.hinta).toLocaleString("fi-FI")             }€
                        </h2>
                        <h3 className="float-end">
                            {counts[item.id]} X  { item.alennettuhinta ? <><del>{item.hinta + "€"}</del>
                <h4 className="discount">{item.alennettuhinta + "€"}</h4>
                <h6 className="percent">{"-"+ Number((item.hinta - item.alennettuhinta)/item.hinta * 100).toFixed(0) + "%"}</h6></>
                :<h3 className="inline">{item.hinta + "€"}</h3>}
                        </h3>
                    </li>
                ))}
            </ul>
            <div className="text-end d-flex flex-column">
                <h3 className="">Yhteensä: </h3>
                <h1 className="">{sum.toLocaleString("fi-FI")} €</h1>
            </div>

            <div style={{ padding: 0 }}>
                <p className="text ms-2">Coupons:</p>
                <p className="text">
                    <input
                        id="coupon"
                        type="text"
                        className="form-label col-4 ms-2"
                    ></input>
                </p>
            </div>

            <h2 className="text">
                <Link to="/order" className="btn btn-own right">
                Siirry tilaamaan
                </Link>
            </h2>
        </div>
    );
}