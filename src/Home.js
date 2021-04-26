import asus from './tuoteimg/asus.jpg';
import adrus from './tuoteimg/adrus.jpg';
import geforce from './tuoteimg/geforce.jpg';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

export default function Home({ URL, addToCart }) {
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [items, setItems] = useState([]);
    const [kuva, setTuotekuva] = useState("");

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


    //addToCart()

    // function addToCart(item){
    //     const newCart = [...cart, item];
    //     setCart(newCart);
    //     localStorage.setItem("cart", JSON.stringify(newCart));
    //     window.location.reload(false);
    // }

    return (
        <>


            <div className="row">

                <div id="carouselExampleCaptions" className="carousel slide p-0" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner ">
                        <div className="carousel-item active ">
                            <a href="/Product/4"><img src={geforce} className="d-block w-100" alt="geforce"></img></a>

                        </div>
                        <div className="carousel-item">
                            <img src={asus} className="d-block w-100" alt="asus"></img>

                        </div>
                        <div className="carousel-item">
                            <img src={adrus} className="d-block w-100" alt="adrus"></img>

                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="row">
                <h1>Viikon tarjoukset</h1>
            </div>
            <div className="row">
                {items.slice(0, 4).map((item) => (
                    <div
                        className="card col-xl-3 col-lg-6 col-md-6 col-sm-12 text-center"
                        key={item.id}>

                        <div className="yläosa">
                            <Link to={"/Product/" + item.id}>
                                <img src="" className="card-img-top" alt=""></img>
                                <div className="card-body">
                                    <img src={item.kuva} className="tuotekuva" alt="Logo" />
                                    <h5 className="card-title">{item.tuotenimi}</h5>
                                    <p className="card-text text-left productdestext">{item.tuotetiivistelmä}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="row align-bottom cardpricebackground">
                            <div className="vasen-pohja col-6 align-bottom ">
                                <button type="button"
                                    onClick={e => addToCart(item.id)}
                                    className="btn btn-primary mb-2"
                                >
                                    <i className="fa fa-shopping-cart"></i>
                                </button>
                            </div>
                            <div className="oikea-pohja col-6 mt-2 align-bottom">
                                {item.alennettuhinta ? <><del>{item.hinta + "€"}</del>
                                    <h5 className="discount">{item.alennettuhinta + "€"}</h5>
                                    <h6><span className="percent"> {"-" + Number((item.hinta - item.alennettuhinta) / item.hinta * 100).toFixed(0) + "%"}</span></h6></>
                                    : <h5>{item.hinta + "€"}</h5>}
                            </div>
                        </div>


                    </div>
                ))}
            </div>
            <div className="row">
                <h1>Comm's Suosittelee</h1>
            </div>
            <div className="row">
                {items.slice(4, 16).map((item) => (
                    <div
                        className="card col-xl-3 col-lg-6 col-md-6 col-sm-12 text-center"
                        key={item.id}>

                        <div className="yläosa">
                            <Link to={"/Product/" + item.id}>
                                <div className="card-body">
                                    <img src={item.kuva} className="img-fluid tuotekuva" alt="Logo" />
                                    <h5 className="card-title">{item.tuotenimi}</h5>
                                    <p className="card-text text-left productdestext">{item.tuotetiivistelmä}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="row align-bottom">
                            <div className="vasen-pohja col-6 align-bottom">
                                <button
                                    onClick={(e) => addToCart(item.id)}

                                    className="btn btn-primary mb-2"
                                >
                                    <i className="fa fa-shopping-cart"></i>
                                </button>
                            </div>
                            <div className="oikea-pohja col-6 mt-2 align-bottom ">
                                {item.alennettuhinta ? <><del>{item.hinta + "€"}</del>
                                    <h5 className="">{item.alennettuhinta + "€"}</h5>
                                    <h6 className="">{"-" + Number((item.hinta - item.alennettuhinta) / item.hinta * 100).toFixed(0) + "%"}</h6></>
                                    : <h5 className="price">{item.hinta + "€"}</h5>}
                            </div>
                        </div>


                    </div>
                ))}
            </div>

        </>
    )
}