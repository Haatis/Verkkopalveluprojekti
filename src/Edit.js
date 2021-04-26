import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  
import { useHistory } from "react-router-dom";

export default function Edit({URL, setUser}) {
    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [tuotetiivistelma, setTuotetiivistelma] = useState("");
    const [hinta, setHinta] = useState("");
    const [alennettuhinta, setAlennettuhinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [kategoria, setKategoria] = useState('');
    const [luokka, setLuokka] = useState('');
    const [kuva, setKuva] = useState("");
    const [items, setItems] = useState([]);
    const { it } = useParams();
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
                setTuotenimi(response[0].tuotenimi)
                setHinta(response[0].hinta)
                setAlennettuhinta(response[0].alennettuhinta)
                setTuotetiivistelma(response[0].tuotetiivistelmä)
                setTuotekuvaus(response[0].tuotekuvaus)
                setKuva(response[0].kuva)
                setKategoria(response[0].kategoria)
                setLuokka(response[0].luokka)
                console.log(response)
              } else {
                alert(response.error);
              }
            },
            (error) => {
              alert(error);
            }
          );
      }, []);

      const edit = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/edit.php', {
          tuotenimi:tuotenimi,
          hinta:hinta,
          alennettuhinta:alennettuhinta,
          tuotetiivistelma:tuotetiivistelma,
          tuotekuvaus:tuotekuvaus,
          kuva:kuva,
          id:it,
          kategoria:kategoria,
          luokka:luokka,
        }).then((response) => {
            console.log(response);
            history.push('/add')
        });
    };
  
    
    useEffect(() => {
      let status = 0;
          const config = {
          method: 'POST',
          credentials: 'include',
              headers: {
            'Accept' : 'application/json'
          }}
      fetch(URL + "secret.php", config)
          .then((response) => {
            console.log(response)
              if (response.status === 401) {
                alert("et ole kirjautunut sisään")
                history.push('/')
                
              }
              status = parseInt(response.status);
              return response.json();
             
          })
          .then(
            
              (response) => {
                
                  if (status === 200) {
                    setUser(response);
                  
                  
                    if(response.oikeudet === "admin"){
                     
                      
                      
                    }else {
                      alert("et ole kirjautunut ylläpitäjänä")
                      history.push('/')
                      
                      
                    } 
                  } 
                  
              });  ;
    } , []);

    return (
<>


<div className="row">
    <div className="bg-light">
    
{items.map((item) => (
        <div className="" key={item.id}>
                    
                        <div >
                            <div className="">
                            <h2 className="ms-4" ><span className="fw-bold">Tuotenimi</span> - {item.tuotenimi} </h2>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                            <img src={item.kuva} className="tuotesivukuva" alt="Logo" />
                            <h4 className="me-5"><span className="fw-bold">Tuotekuvaus</span> - {item.tuotekuvaus}</h4>
                            <h4 className="me-5"><span className="fw-bold">Tuotetiivistelmä</span> - {item.tuotetiivistelmä}</h4>
                            <h4><span className="fw-bold">Tuotehinta</span> - {item.hinta + "€"}</h4>
                            </div>
                                </div>
                            </div>
                        </div>
                </div>
                
                 ))}
                 

<div>
<form className="bg-light row" onSubmit={edit}>
        <div className="row">
        <div className="col-2">
          <label for="exampleEmail" sm={2}>Tuotenimi *</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotenimi(e.target.value)} value={tuotenimi} type="text" required/>
          </div>
        </div>
        <div className="col-2">
          <label for="examplePassword" sm={2}>Hinta *</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setHinta(e.target.value)} value={hinta} type="text" required />
          </div>
        </div>

        <div className="col-2">
          <label for="examplePassword" sm={2}>Alennettu hinta</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setAlennettuhinta(e.target.value)} value={alennettuhinta} type="text" />
          </div>
        </div>

        <div className="col-2">
          <label for="examplePassword" sm={2}>tuotetiivistelmä *</label>
          <div className="col-sm-10" >
            <textarea onChange={(e) => setTuotetiivistelma(e.target.value)} value={tuotetiivistelma} type="text" required/>
          </div>
        </div>

        <div className="col-2">
          <label for="examplePassword" sm={2}>tuotekuvaus *</label>
          <div className="col-sm-10" >
            <textarea onChange={(e) => setTuotekuvaus(e.target.value)} value={tuotekuvaus} type="text" required/>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col-2">
          <label for="examplePassword" sm={2}>Kuva (url) *</label>
          <div className="col-sm-10" >
            <textarea onChange={(e) => setKuva(e.target.value)} value={kuva} type="text" required/>
          </div>
        </div>

        <div className="col-2">
          <label for="examplePassword" sm={2}>Kategoria *</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setKategoria(e.target.value)} value={kategoria} type="text" required/>
          </div>
        </div>


        <div className="col-2">
          <label for="examplePassword" sm={2}>Luokka *</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setLuokka(e.target.value)} type="text" value={luokka} required/>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-10 m-2" >
            <button >Muokkaa tuotetta </button>
          </div>
        </div>

    
      </form>
        </div>
                 </div>
        </div>     
    </>

    )
}