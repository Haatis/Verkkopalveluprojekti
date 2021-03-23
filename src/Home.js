
import asus from './tuoteimg/asus.jpg';
import adrus from './tuoteimg/adrus.jpg';
import geforce from './tuoteimg/geforce.jpg';
import kuva1 from './tuoteimg/1.jpg';
import kuva2 from './tuoteimg/2.jpg';
import kuva3 from './tuoteimg/3.jpg';
import kuva4 from './tuoteimg/4.jpg';
import { useState, useEffect } from "react";
import Content from "./Content";





export default function Home() {
    const URL = "http://localhost/verkkokauppa/";
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [items, setItems] = useState([]);
    const kuvat = [kuva1, kuva2, kuva3, kuva4]
    useEffect(() => {
        let status = 0;
        fetch(URL + "index.php")
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
    return (
        <>

        <div class="row">

        <div id="carouselExampleCaptions" className="carousel slide p-0" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner ">
                <div className="carousel-item active ">
                <img src={geforce} className="d-block w-100" alt="geforce"></img>
               
                </div>
                <div className="carousel-item">
                <img src={asus} className="d-block w-100" alt="asus"></img>
                
                </div>
                <div className="carousel-item">
                <img src={adrus} className="d-block w-100" alt="adrus"></img>
               
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </div>
        <div className="row">
           <h1>Päivän tarjoukset</h1>
        </div>          
                           
                       
        <div className="row">
        {items.slice(0,4).map((item) => (
        <div class="card col-xl-3 col-lg-6 col-md-6 col-sm-12 text-center" key={item.id}>
                    <a href={"/Product/"+item.id}>
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                            <img src={kuvat[item.id-1]} className="tuotekuva" alt="Logo" />
                                <h5 class="card-title">{item.tuotenimi}</h5>
                                <p class="card-text text-left">{item.tuotekuvaus}</p>
                               <div class="vasen-pohja">
                                <a href="#" class="btn btn-primary"><i class="fa fa-shopping-cart"></i></a>
                                </div>
                                <div class="oikea-pohja">
                                <p>{item.hinta + "€"}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                 ))}
        </div>

        <div class="row">
        <h1>Comm's Suosittelee</h1>
        </div>
        <div class="row">
        <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>
        </div>
        <div class="row">
        <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>
        </div>
     
     </>
    )
}