import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
    const URL = "HTTP://localhost/verkkokauppa/"
    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [kuva, setTuotekuva] = useState("");
    const [items, setItems] = useState([]);
    const { it } = useParams();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let status = 0;
        fetch(URL + "retrieve.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            search: it,
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
      }, []);
  
      useEffect(() => {
        if ("cart" in localStorage) {
          setCart(JSON.parse(localStorage.getItem("cart")));
        }
      }, []);
    
      function addToCart(item) {
        const newCart = [...cart, item];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.reload(false);
      }

    return (
<>


<div className="row">
    <div className="bg-light">
    
{items.map((item) => (
        <div className="" key={item.id}>
                    
                        <div >
                            <div className="">
                            <h2 className="ms-4">{item.tuotenimi}</h2>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                            <img src={item.kuva} className="tuotesivukuva" alt="Logo" />
                            </div>
                            <div className="col-md-6 col-sm-12"> 
                            <h3>Tuotekuvaus</h3>
                            <h5 className="me-5">{item.tuotekuvaus}</h5>
                            <h4>{item.hinta + "€"}</h4>
                            <button  onClick={() => addToCart(item.id)} className="btn btn-primary col-5 p-2">Lisää ostoskoriin<i className="fa fa-shopping-cart"></i></button>
                            </div>
                                </div>
                            </div>
                        </div>
                </div>
                
                 ))}
                 </div>
        </div>     
    </>

    )
}