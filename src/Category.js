import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Category() {

    const URL = "HTTP://localhost/verkkokauppa/"
    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [items, setItems] = useState([]);
    const [kuva, setTuotekuva] = useState("");
    const { it } = useParams();
    console.log(it);

    useEffect(() => {
        let status = 0
        fetch(URL + "category.php", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                search: it
            })
        })
            .then(response => {
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
            <div className="row">


                <div className="col-3 bg-secondary border border-dark">
                    <h1>Haku</h1>
                </div>
                <div className="col-9 bg-secondary border border-dark">
                    <h1>content</h1>


                    <div className="row">
                        {items.map((item) => (
                            <li className="card col-lg-6 col-md-12 text-center" key={item.id}>
                                <div>
                                    <a href="">
                                        <div >

                                            <img src="" class="card-img-top" alt=""></img>
                                            <div class="card-body">
                                                <img src={item.kuva} className="tuotekuva" alt="Logo" />
                                                <h5 class="card-title">{item.tuotenimi}</h5>
                                                <p class="card-text">{item.tuotenimi}</p>
                                                <p class="card-text">{item.tuotekuvaus}</p>
                                                <p class="card-text">{item.tuotetiivistelmä}</p>
                                                <div class="vasen-pohja">
                                                    <a href="#" class="btn btn-primary"><i class="fa fa-shopping-cart"></i></a>
                                                </div>
                                                <p>{item.hinta + "€"}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </div>




                </div>
            </div>
        </>
    );
}
