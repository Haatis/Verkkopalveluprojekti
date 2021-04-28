import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

export default function Account({ URL, user, setUser }) {
    const [account, setAccount] = useState([]);
    const [tilaukset, setTilaukset] = useState([]);
    const [kayttaja, setKayttaja] = useState([]);
    const [tuote, setTuote] = useState([]);
    const { it } = useParams();
    let history = useHistory();
    const [oldPass, setOldPass] = useState(null)
    const [newPass, setNewPass] = useState(null)
    const [confirmNewPass, setConfirmNewPass] = useState(null)
    const [email, setEmail] = useState(null)
    const [etunimi, setEtunimi] = useState(null)
    const [sukunimi, setSukunimi] = useState(null)
    const [osoite, setOsoite] = useState(null)
    const [postinro, setPostinro] = useState(null)
    const [kunta, setKunta] = useState(null)
    const [puh, setPuh] = useState(null)

    //asettaa tiedot valmiiksi päivitä tietoja formiin
    useEffect(() => {
        if (user != null) {
            console.log(user)
            setEmail(user.email)
            setEtunimi(user.etunimi)
            setSukunimi(user.sukunimi)
            setOsoite(user.osoite)
            setPostinro(user.postinro)
            setKunta(user.kunta)
            setPuh(user.puh)
            if (user.email != it) {
                alert("Tämä ei ole käyttäjäsi sivu")
                history.push('/')
            }
            lähetä();
            tilaus();
        }
    }, [user])





    /*   useEffect(() => {
           if (user===null) {
               alert("Et ole kirjautunut sisään")
               history.push('/')
            
           } else {
               lähetä();
               tilaus();
           } 
         }, [])
      
         */

    // useEffect(() => {
    //     let status = 0;
    //     const config = {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Accept': 'application/json'
    //         }
    //     }
    //     fetch(URL + "secret.php", config)
    //         .then((response) => {
    //             if (response.status === 401) {
    //                 alert("et ole kirjautunut sisään")
    //                 history.push('/')

    //             }
    //             status = parseInt(response.status);
    //             return response.json();

    //         })
    //         .then(

    //             (response) => {
    //                 if (status === 200) {
    //                     if (response.email != it) {
    //                         alert("Tämä ei ole käyttäjäsi sivu")
    //                         history.push('/')
    //                     }
    //                     //setUser(response);
    //                     lähetä();
    //                     tilaus();
    //                 }

    //             });;
    // }, []);


    const lähetä = (e) => {
        axios.post('http://localhost/verkkokauppa/account.php', {
            search: it,
        }
        ).then((response) => {
            setAccount(response.data[0])
            console.log(account)
        })
    }

    const tilaus = (e) => {
        axios.post('http://localhost/verkkokauppa/orders.php', {
            search: user.userid,
        }
        ).then((response) => {
            setTilaukset(response.data)
        })
    }


    const tilaustuote = (tuote) => {
        axios.post('http://localhost/verkkokauppa/orderedproducts.php', {
            search: tuote,
        }
        ).then((response) => {
            setTuote(response.data)

        })
    }

    function changePass(e) {
        e.preventDefault();
        let status = 0;
        if (newPass != confirmNewPass) {
            alert("Salasanat eivät täsmää!")
        } else if (oldPass === newPass) {
            alert("Uusi salasana ei saa olla sama kuin vanha salasana.")
        } else {
            fetch(URL + "changePass.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: user.userid,
                    oldPass: oldPass,
                    newPass: newPass
                }),
            })
                .then((response) => {
                    status = parseInt(response.status);
                    return response.json();
                })
                .then(
                    (response) => {
                        if (status === 200) {
                            if (response.message === "success") {
                                alert("Salasanan vaihto onnistui.")
                            } else {
                                alert("Väärä vanha salasana.")
                            }
                        } else {
                            alert(response.error)
                        }
                    },
                    (error) => {
                        alert(error);
                    }
                );
        }
    }

    function editAccount(e) {
        e.preventDefault();
        let status = 0;
        fetch(URL + "updateAccount.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userid: user.userid,
                email: email,
                etunimi: etunimi,
                sukunimi: sukunimi,
                osoite: osoite,
                postinro: postinro,
                kunta: kunta,
                puh: puh
            }),
        })
            .then((response) => {
                status = parseInt(response.status);
                return response.json();
            })
            .then(
                (response) => {
                    if (status === 200) {
                        if (response.message === "success") {
                            alert("Tiedot tallennettu.")
                            history.push("/Account/" + email)



                            //hakee käyttäjän muutokset back-endistä ja päivittää sivun tiedot
                            const config = {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }
                            fetch(URL + "getUser.php", config)
                                .then((response) => {
                                    status = parseInt(response.status);
                                    return response.json();
                                })
                                .then(
                                    (response) => {
                                        if (status === 200) {
                                            setUser(response);
                                        }
                                    }
                                );
                            //

                        } else if (response.message === "exists") {

                            alert("Tämä sähköpostiosoite on jo käytössä")

                        }
                    } else {
                        alert(response.error)
                    }
                },
                (error) => {
                    alert(error);
                }
            );



    }

    return (
        <div className="row bg-light">
            <h2 className="text-lg-center text-sm-start">Käyttäjän <span className="text-primary">{it}</span> tilisivu</h2>
            <h5 className="mb-4">käyttäjä luotu:  {account.added}</h5>

            <div className="col-6">
                <h3>Vaihda salasana</h3>
                <form onSubmit={changePass} className="row d-flex align-items-start">
                    <div className="row">
                        <div className="">
                            <label className="form-label" for="oldPass">Vanha salasana <span id="requiredForm">*</span></label>
                            <input className="form-control" type="password" id="oldPass" required
                                onChange={e => setOldPass(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="newPass">Uusi salasana <span id="requiredForm">*</span></label>
                            <input className="form-control" type="password" id="newPass" required
                                onChange={e => setNewPass(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="confirmNewPas">Vahvista salasana <span id="requiredForm">*</span></label>
                            <input className="form-control" type="password" id="confirmNewPas" required
                                onChange={e => setConfirmNewPass(e.target.value)} />
                        </div>
                        <div className="text-end mt-0">
                            <button className="btn btn-primary my-4">Tallenna salasana</button>
                        </div>
                    </div>

                </form>
            </div>

            <div className="col-6 ">


                <h3>Päivitä tietoja</h3>
                <form onSubmit={editAccount} className="row d-flex align-items-start">
                    <div className="row">
                        <div className="">
                            <label className="form-label" for="email">Sähköpostiosoite</label>
                            <input className="form-control" type="email" id="email" value={email} required
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="nimi">Etunimi</label>
                            <input className="form-control" type="text" id="nimi" value={etunimi} required
                                onChange={e => setEtunimi(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="sukunimi">Sukunumi</label>
                            <input className="form-control" type="text" id="sukunimi" value={sukunimi} required
                                onChange={e => setSukunimi(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="osoite">Osoite</label>
                            <input className="form-control" type="text" id="osoite" value={osoite}
                                onChange={e => setOsoite(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="postinro">Postinumero</label>
                            <input className="form-control" type="text" id="postinro" value={postinro}
                                onChange={e => setPostinro(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="kunta">Kunta</label>
                            <input className="form-control" type="text" id="kunta" value={kunta}
                                onChange={e => setKunta(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="form-label" for="puh">Puhelinnumero</label>
                            <input className="form-control" type="tel" id="puh" value={puh}
                                onChange={e => setPuh(e.target.value)} />
                        </div>
                        <div className="text-end mt-0">
                            <button className="btn btn-primary my-4">Tallenna</button>
                        </div>
                    </div>

                </form>
            </div>
            <h4 ><i className="fa fa-list"></i> Tilaukset ({tilaukset.length}) -</h4>
            <hr></hr>
            <div className="col-lg-6 col-lg-12">
                {tilaukset.map((tilaus) => (
                    <div key={tilaus.id} >

                        <div>
                            <h5 className="">Tilaus id: {tilaus.id}</h5>
                        </div>

                        <div>
                            <h5 className="">Toimitustapa: {tilaus.toimitustapa}</h5>
                        </div>

                        <div>
                            <h5 className="">Maksutapa: {tilaus.maksutapa}</h5>
                        </div>
                        <div>
                            <h5 className="">Hinta :{tilaus.hinta}</h5>
                        </div>
                        <div className="mb-4 border-bottom">

                            <h5 className="inline">Tilauspvm : {tilaus.pvm}</h5>
                            <button className="btn-primary inline mt-3 mb-1 ms-lg-4 ms-md-2 ms-sm-2" onClick={() => tilaustuote(tilaus.id)}>Näytä tuotteet</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                {tuote.map((tilaus) => (
                    <div className="col-lg-12" key={tilaus.id} >

                        <div className="col-lg-4">
                            <img src={tilaus.kuva} className="tuotekuva-tili imgborder img-fluid" alt="Logo" />
                        </div>

                        <div className="col-lg-4 mb-4 border-bottom">
                            <h5 className="">Kpl: {tilaus.kpl}</h5>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}