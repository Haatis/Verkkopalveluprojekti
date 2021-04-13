import { useState, useEffect } from "react";
import axios from 'axios';

export default function ContactUs({URL}) {
    const [nimi, setNimi] = useState("")
    const [puhelin, setPuhelin] = useState("")
    const [sposti, setSposti] = useState("")
    const [otsikko, setOtsikko] = useState("")
    const [viesti, setViesti] = useState("")




    function send(e){
        //e.preventDefault();
            fetch(URL + "contact.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nimi: nimi,
                    puhelin: puhelin,
                    sposti: sposti,
                    otsikko: otsikko,
                    viesti: viesti,
                }),
            })
            alert("Palaute lähetetty")
    }

    return (
        <div className="row bg-light justify-content-center">
            <form onSubmit={send} className="row d-flex align-items-start">
                <div className="col-lg-6 row">
                    <div className="col-md-6 my-3">
                        <label className="form-label" for="nimi">Etu- ja sukunimi</label>
                        <input className="form-control" type="text" id="nimi" required 
                        onChange={e => setNimi(e.target.value)}/>
                    </div>
                    <div className="col-md-6 my-3">
                        <label className="form-label" for="puhelin">Puhelin</label>
                        <input className="form-control" type="tel" id="puhelin" 
                        onChange={e => setPuhelin(e.target.value)}/>
                    </div>
                    <div className="my-3">
                        <label className="form-label" for="sposti">Sähköposti</label>
                        <input className="form-control" type="email" id="sposti" required
                        onChange={e => setSposti(e.target.value)}/>
                    </div>

                </div>
                <div className="col-lg-6">
                    <div className=" my-3">
                        <label className="form-label" for="otsikko">Viestin otsikko</label>
                        <input className="form-control" type="text" id="otsikko" required maxlength="50"
                        onChange={e => setOtsikko(e.target.value)}/>
                    </div>
                    <div className=" my-3">
                        <label className="form-label" for="viesti">Viesti</label>
                        <textarea className="form-control" type="text" id="viesti" required
                        onChange={e => setViesti(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary my-2 ">Lähetä</button>
                </div>


            </form>
        </div>
    )
}