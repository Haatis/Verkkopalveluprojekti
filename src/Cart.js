import userEvent from "@testing-library/user-event";
import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

export default function Cart({URL, clearItem, removeItem, addItem, cart}) {
    const [items, setItems] = useState([]);


  //hakee ostoskorin tiedot localsoragesta
  const localCart = localStorage.getItem("cart");
  let arr = JSON.parse(localCart);

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
    }, [cart]);




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
        <div className="row bg-secondary">
            <h1>Shopping cart</h1>
            <h5 className="text">Products:</h5>
            <p className="text">
            </p>
            <ul className="text-center d-flex flex-column">
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
                        <div>
                            <img src={item.kuva} className="img-fluid col-1 float-start" alt="Logo" />
                            <h1 className="float-start">{item.tuotenimi}</h1>
                        </div>
                        <h1 className="text-danger float-end">
                            {(counts[item.id] * item.hinta).toLocaleString("fi-FI")} €
                        </h1>
                        <h3 className="float-end">
                            {counts[item.id]} X {item.hinta.toLocaleString("fi-FI")}€
                        </h3>
                    </li>
                ))}
            </ul>
            <div className="text-end d-flex flex-column">
                <h3 className="">Yhteensä: </h3>
                <h1 className="text-danger">{sum.toLocaleString("fi-FI")} €</h1>
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