import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
export default function Product({ URL, addToCart, user, admin }) {
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

  let history = useHistory();

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

      );
  }, [kommentit]);

  function remove(id) {
    axios.post('http://localhost/verkkokauppa/deletecomment.php', {
      id: id,
    }).then((response) => {
      history.push('/product/' + it)
    });
  };

  const comment = (e) => {
    if (arvosana > 5) {
      alert("arvosanan tulee olla 0-5 v??lilt??")
      return
    } else if (arvosana < 0) {
      alert("arvosanan tulee olla 0-5 v??lilt??")
      return
    } else {
      axios.post('http://localhost/verkkokauppa/postcomment.php', {
        otsikko: otsikko,
        kommentti: kommentti,
        arvosana: arvosana,
        user: user[0],
        tuoteid: it,
      }).then((response) => {
      });
    }
  };



  function t??hti(e) {

    if (e > 4.5) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></>)
    } else if (e > 4.0) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i></>)
    } else if (e > 3.5) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></>)
    } else if (e > 3.0) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i></>)
    } else if (e > 2.5) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></>)
    } else if (e > 2.0) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half"></i></>)
    } else if (e > 1.5) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star"></i></>)
    } else if (e > 1.0) {
      return (<><i className="fa fa-star"></i><i className="fa fa-star-half"></i></>)
    } else if (e > 0.5) {
      return (<><i className="fa fa-star"></i></>)
    } else if (e > 0.0) {
      return (<><i className="fa fa-star-half"></i></>)
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
                          {item.alennettuhinta ? <><del className="pricebackground">{item.hinta + "???"}</del><h5>{item.alennettuhinta + "???"}</h5>
                            <h6><span className="percent-prodcut">{" -" + Number((item.hinta - item.alennettuhinta) / item.hinta * 100).toFixed(0) + "%"}</span></h6></>
                            : <h5><span className="pricebackground">{item.hinta + "???"}</span></h5>}<p className="lis??info">sis??lt???? alv. 24%</p></h4>
                      </div>
                      <button onClick={() => addToCart(item.id)} className="btn btn-primary col-lg-5 col-md-5 col-8 p-2 mb-3">Lis???? ostoskoriin<i className="fa fa-shopping-cart"></i></button>
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
              <h3>{t??hti(Math.round(keskiarvo.keskiarvo * 10) / 10)}</h3>
            </div>
          </div>
        </div>

      ))}

      {kommentit.map((kommentti) => (
        <div className="row kommenttitausta">
          <div className="" key={kommentti.id}>


            <div className="bg-white p-2 m-2 border border-dark">
              <div className="">
                <h3 className="ms-4">{kommentti.otsikko} {t??hti(kommentti.arvosana)} </h3>
                <h4 className="ms-4">{kommentti.kommentti}</h4>
                <h5 className="ms-4">{kommentti.k??ytt??j??}</h5>
                {(admin) && <button className="delete" onClick={() => remove(kommentti.id)} href="#">Delete</button>}


              </div>
            </div>
          </div>
        </div>

      ))}
      <form onSubmit={comment}>
        <div className="row bg-white">
          {(user) && <div className="row">
            <h4>J??t?? tuotteelle arvostelu</h4>

            <label for="examplePassword" sm={2}>Otsikko</label>
            <div className="col-sm-10" >
              <input onChange={(e) => setOtsikko(e.target.value)} type="text" required />
            </div>
          </div>}
          {(user) && <div className="row">
            <label for="examplePassword" sm={2}>Kommentti</label>
            <div className="col-sm-10" >
              <input onChange={(e) => setKommentti(e.target.value)} type="text" required />
            </div>
          </div>}

          {(user) && <div className="row">
            <label for="examplePassword" sm={2}>Arvosana (0-5)</label>
            <div className="col-sm-10" >
              <input onChange={(e) => setArvosana(e.target.value)} type="number" required min={0} max={5}
              />
            </div>
          </div>}

          {(user) && <div className="row">
            <div className="col-sm-10" >

              <button className="mb-3" >Lis???? arvostelu</button>
            </div>
          </div>}

        </div>
      </form>

    </>

  )
}