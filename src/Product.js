import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  

export default function Product() {
    const URL = "HTTP://localhost/verkkokauppa/"
    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [kuva, setTuotekuva] = useState("");
    const [items, setItems] = useState([]);
    const [kommentit, setKommentit] = useState([]);
    const { it } = useParams();
    const [cart, setCart] = useState([]);
    const [otsikko, setOtsikko] = useState('');
    const [kommentti, setKommentti] = useState('');
    const [arvosana, setArvosana] = useState('');
    const [id, setId] = useState('');
    const [kayttaja, setKayttaja] = useState('');
    const [user, setUser] = useState([]);
    const [admin, setAdmin] = useState([]);

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
        let status = 0;
        fetch(URL + "comment.php", {
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
                setKommentit(response);
              } else {
                alert(response.error);
              }
            },
            (error) => {
              alert(error);
            }
          );
      }, []);

      function remove(id) {
        axios.post('http://localhost/verkkokauppa/deletecomment.php', {
          id:id,
        }).then((response) => {
            console.log(response);
            window.location.href = "http://localhost:3000/product/" + it
        });
    };

      const comment = (e) => {
        axios.post('http://localhost/verkkokauppa/postcomment.php', {
          otsikko:otsikko,
          kommentti:kommentti,
          arvosana:arvosana,
          user:user[0],
          tuoteid:it,
        }).then((response) => {
            console.log(response);
            window.location.href = "http://localhost:3000/product/" + it
        });
    };

    useEffect(() =>{
      if("user" in localStorage){
          setUser(JSON.parse(localStorage.getItem("user")))
      }
    }, [])


      useEffect(() => {
        if ("cart" in localStorage) {
          setCart(JSON.parse(localStorage.getItem("cart")));
        }
      }, []);

      useEffect(() =>{
        if("admin" in localStorage) {
          setAdmin(JSON.parse(localStorage.getItem("admin")));
        } 
      }, [])
    
      function addToCart(item) {
        const newCart = [...cart, item];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.reload(false);
      }

      function tähti (e) {
        if (e === 4) {
          return (<><i class='fa fa-star'></i> <i class='fa fa-star'></i> <i class='fa fa-star'></i> <i class='fa fa-star'></i></>)
        }  else if (e === 3) {
          return (<><i class='fa fa-star'></i> <i class='fa fa-star'></i> <i class='fa fa-star'></i></>)
        } else if (e === 2) {
          return (<><i class='fa fa-star'></i> <i class='fa fa-star'></i></>)
        } else if (e === 1) {
          return (<><i class='fa fa-star'></i></>)
        } else {
          return (<><i class='fa fa-star'></i> <i class='fa fa-star'></i> <i class='fa fa-star'></i> <i class='fa fa-star'></i> <i class='fa fa-star'></i></>)
        }
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
       
          {kommentit.map((kommentti) => (
            <div className="row kommenttitausta">
        <div className="" key={kommentti.id}>
                    

                        <div className="bg-white p-2 m-2 border border-dark">
                            <div className="">
                            <h3 className="ms-4">{kommentti.otsikko} {tähti(parseInt(kommentti.arvosana))} </h3>
                            <h4 className="ms-4">{kommentti.kommentti}</h4>
                            <h5 className="ms-4">{kommentti.käyttäjä}</h5>
                            {("admin" in localStorage) && <button className="delete" onClick={() => remove(kommentti.id)} href="#">Delete</button>}
                            
                          
                            </div>
                        </div>
                </div>
                </div>
                
                 ))}
                
                 <div className="row bg-white">
                 {("user" in localStorage) && <div className="row">
                   
           <label for="examplePassword" sm={2}>Otsikko</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setOtsikko(e.target.value)} type="text"/>
          </div>
        </div>}
        {("user" in localStorage) &&<div className="row">
          <label for="examplePassword" sm={2}>Kommentti</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setKommentti(e.target.value)} type="text"/>
          </div>
        </div>}

        {("user" in localStorage) && <div className="row">
          <label for="examplePassword" sm={2}>Arvosana</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setArvosana(e.target.value)} type="text"/>
          </div>
        </div>}

        {("user" in localStorage) &&<div className="row">
        <div className="col-sm-10" >
        
            <button onClick={comment}>Lisää arvostelu</button>
          </div>
        </div>}

        </div>
        
        
    </>

    )
}