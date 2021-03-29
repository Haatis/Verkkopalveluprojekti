import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  

export default function Edit() {
    const URL = "HTTP://localhost/verkkokauppa/"
    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [tuotetiivistelma, setTuotetiivistelma] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [kategoria, setKategoria] = useState('');
    const [luokka, setLuokka] = useState('');
    const [kuva, setKuva] = useState("");
    const [items, setItems] = useState([]);
    const { it } = useParams();
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


      const edit = (e) => {
        e.preventDefault();
        axios.post('http://localhost/verkkokauppa/edit.php', {
          tuotenimi:tuotenimi,
          hinta:hinta,
          tuotetiivistelma:tuotetiivistelma,
          tuotekuvaus:tuotekuvaus,
          kuva:kuva,
          id:it,
        }).then((response) => {
            console.log(response);
            window.location.href = "http://localhost:3000/add"
        });
    };
  

    return (
<>


<div className="row">
    <div className="bg-light">
    
{items.map((item) => (
        <div className="" key={item.id}>
                    
                        <div >
                            <div className="">
                            <h2 className="ms-4">Tuotenimi - {item.tuotenimi}</h2>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                            <img src={item.kuva} className="tuotesivukuva" alt="Logo" />
                            <h4 className="me-5">tuotekuvaus - {item.tuotekuvaus}</h4>
                            <h4 className="me-5">tuotetiivistelmä - {item.tuotetiivistelmä}</h4>
                            <h4>tuotehinta - {item.hinta + "€"}</h4>
                            </div>
                                </div>
                            </div>
                        </div>
                </div>
                
                 ))}

<div>
      <form className="bg-light">
        <div className="row">
          <label for="exampleEmail" sm={2}>Tuotenimi</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotenimi(e.target.value)} type="text" />
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>Hinta</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setHinta(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>tuotetiivistelmä</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotetiivistelma(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>tuotekuvaus</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setTuotekuvaus(e.target.value)} type="text"/>
          </div>
        </div>

        <div className="row">
          <label for="examplePassword" sm={2}>tuotekuva (url)</label>
          <div className="col-sm-10" >
            <input onChange={(e) => setKuva(e.target.value)} type="text"/>
          </div>
        </div>

        
        <div className="row">
        <div className="col-sm-10" >
            <button onClick={edit}>Muokkaa tietoja</button>
          </div>
        </div>

        </form>
        </div>
                 </div>
        </div>     
    </>

    )
}