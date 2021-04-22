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

    //jos tuotteiden määrä on 0, poistetaan se näkyvistä
    const id = items.map((item) => Number(item.id))
    for(var i = 0; i < id.length; i++){
          if(typeof counts[id[i]] === "undefined")
          {
              console.log(Number([i]) + 1 +  " on tyhjä")
              console.log(localCart);
            }
    }


//hakee ostoskorissa olevat tuotteet tietokannasta
    useEffect(() => {
            if (localStorage.getItem("cart") != null && arr.length != 0) {
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
            }else{
                setItems([])
            }
    }, [cart, localCart]);




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



    // if(localCart.length === 0){
    //     console.log("tyhjä")
    // }

    return (
        <div className="row bg-secondary">
            <hr className="d-lg-block d-md-block d-sm-none d-none"></hr>
            <h2>OSTOSKORI</h2>
            {/* <div className="col-lg-12 col-md-12 col-sm-12"> */}
            <h5 className="text col-lg-6 col-md-6 col-sm-6 col-6">Tuotteet:</h5>
            <h5 className="text col-lg-6 col-md-6 col-sm-6 col-6 text-end carttext pe-lg-4 position-sticky">Yhteensä</h5>
            {/* </div> */}
            <p className="text">
            </p>
            <ul className="text-center d-flex flex-column ">
                {items.map((item) => (
                    <li key={item.id} className=" border-5 cartbackground" href={"/Product/" + item.id}>
                        <button className="btn-sm btn-warning float-start mt-2 " onClick={() => clearItem(item.id)} value={item.id}>
                            <i className="fa fa-trash-alt"></i>
                        </button>
                        <button className="btn-sm btn-warning float-start mt-2" onClick={() => removeItem(item.id)} value={item.id}>
                            <i className="fa fa-minus-square"></i>
                        </button>
                        <button className="btn-sm btn-warning float-start mt-2 me-2" onClick={() => addItem(item.id)} value={item.id}>
                            <i className="fa fa-plus-square"></i>
                        </button>

                        <div className="cartbackground mt-2 col-lg-8 col-md-8">
                            <img src={item.kuva} className="img-fluid cartimage col-1 float-start imgborder mb-2 d-lg-block d-md-block d-none" alt="Logo" />
                            <h1 className="float-start carttext cartproductinfo img-fluid" >{item.tuotenimi}</h1>
                        </div>

                       <div className="col-lg-6 col-md-4 float-lg-end float-sm-end mt-lg-0 mt-md-0 mt-sm-0 mt-5">
                       <hr className="d-lg-none d-md-none d-sm-none d-block"></hr>
                            <h2 className="ms-4 float-end cartprodcutprice">
                            ={ item.alennettuhinta ? (counts[item.id] *  item.alennettuhinta).toLocaleString("fi-FI")
                            :    (counts[item.id] *  item.hinta).toLocaleString("fi-FI")             }€
                            </h2>

                            <h3 className="float-end cartprodcutprice">
                                {counts[item.id]} X  { item.alennettuhinta ? <><del>{item.hinta + "€"}</del>

                            <h4 className="discount cartprodcutprice" style={{marginLeft:"2em"}}>{item.alennettuhinta + "€"}</h4></>
                            :<h3 className="inline cartproductinfo">{item.hinta + "€"}</h3>}
                            </h3>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-end d-flex flex-column">
                <h3 className="">Kokonaishinta: </h3>
                <h1 className="">{sum.toLocaleString("fi-FI")} €</h1>
            </div>

            <div style={{ padding: 0 }} className="input-groub">
                <p className="text ms-2">Kuponki:</p>
                <p className="text">
                    <input
                        id="coupon"
                        type="text"
                        className="form-label col-4 ms-2"
                    ></input> <button className="btn-warning" id="coupon" type="submit">Lisää</button>
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