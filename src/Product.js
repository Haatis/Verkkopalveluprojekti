import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  
import {Link} from 'react-router-dom'

export default function Product({URL, addToCart}) {
  console.log(URL)

    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [kuva, setTuotekuva] = useState("");
    const [items, setItems] = useState([]);
    const [kommentit, setKommentit] = useState([]);
    const [keskiarvo, setKeskiarvo] = useState([]);
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
      }, [it]);

      useEffect(() => {
        let status = 0;
        fetch(URL + "average.php", {
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
                setKeskiarvo(response);
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




      useEffect(() =>{
        if("admin" in localStorage) {
          setAdmin(JSON.parse(localStorage.getItem("admin")));
        } 
      }, [])
    


      function tähti (e) {
        if (e > 4.5) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></>)
        } else if(e > 4.0) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i></>)
        } else if(e > 3.5) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></>)
        }else if(e > 3.0) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i></>)
        }else if(e > 2.5) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></>)
        }else if(e > 2.0) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i></>)
        } else if(e > 1.5) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star"></i></>)
        } else if(e > 1.0) {
          return(<><i class="fa fa-star"></i><i class="fa fa-star-half"></i></>)
        } else if(e > 0.5) {
          return(<><i class="fa fa-star"></i></>)
        }  else if(e > 0.0) {
          return(<><i class="fa fa-star-half"></i></>)
        } 
      }

    return (
<>

<div className="row">
    <div className="bg-light">
{items.map((item) => (
        <div className="" key={item.id}>
                    
                        <div >
                            <div className="priceinfo mt-2 mb-2">
                            <h2 className="ms-4 title">{item.tuotenimi}</h2>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                            <img src={item.kuva} className="tuotesivukuva col-sm-12 col-md-12 col-10 img-fluid" alt="Logo" />
                            </div>
                            {/* <div className="vr"></div> */}
                            <div className="col-md-6 col-sm-12"> 
                            <h3 className="titlecolor">Tuotekuvaus</h3>
                            <h5 className="me-5 col-sm-10 col-md-10 ">{item.tuotekuvaus}</h5>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-8">
                            <h4 className="priceinfo col-lg-3 col-sm-4">
                              { item.alennettuhinta ? <><del className="pricebackground">{item.hinta + "€"}</del><h5>{item.alennettuhinta + "€"}</h5>
                              <h6><span className="percent-prodcut">{" -"+ Number((item.hinta - item.alennettuhinta)/item.hinta * 100).toFixed(0) + "%"}</span></h6></>
                            :<h5 className="pricebackground">{item.hinta + "€"}</h5>}<p className="lisäinfo">sisältää alv. 24%</p></h4>
                            </div>
                            <button  onClick={() => addToCart(item.id)} className="btn btn-primary col-lg-5 col-md-5 col-8 p-2 mb-3">Lisää ostoskoriin<i className="fa fa-shopping-cart"></i></button>
                            <div className="row">
                            <Link to={"/Ask/" + item.id}>Kysy tuotteesta</Link>
                            </div>
                            </div>
                                </div>
                            </div>
                        </div>
                </div>

                 ))}
                 </div>
        </div>    

        {keskiarvo.map((keskiarvo) => (
            <div className="row kommenttitausta">
        <div className="" key={keskiarvo.id}>
                    

                        <div className=" p-2 m-2 ">
                           <h3>{tähti(Math.round(keskiarvo.keskiarvo*10)/10)}</h3>
                        </div>
                </div>
                </div>
                
                 ))}
       
          {kommentit.map((kommentti) => (
            <div className="row kommenttitausta">
        <div className="" key={kommentti.id}>
                    

                        <div className="bg-white p-2 m-2 border border-dark">
                            <div className="">
                            <h3 className="ms-4">{kommentti.otsikko} {tähti(kommentti.arvosana)} </h3>
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
                   <h4>Jätä tuotteelle arvostelu</h4>
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
        
            <button className="mb-3" onClick={comment}>Lisää arvostelu</button>
          </div>
        </div>}

        </div>
        
        
    </>

    )
}