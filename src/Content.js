import { useState, useEffect } from "react";
import kuva1 from './tuoteimg/1.jpg';
import kuva2 from './tuoteimg/2.jpg';

export default function Content() {
    const URL = "http://localhost/verkkokauppa/";
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [items, setItems] = useState([]);
    const kuvat = [kuva1, kuva2]
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
            <div className="row">


                <div className="col-3 bg-secondary border border-dark">
                    <h1>Haku</h1>
                    <div>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn bt text-dark bg-light" type="submit">
                                Hae
              </button>
                        </form>
                    </div>
                    <div>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Lajittele</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="col-9 bg-secondary border border-dark">
                    <h1>content</h1>


                    <ul className="row">
                        {items.map((item) => (
                            <li className="card col-3 my-2 mx-4 p-1" key={item.id}>
                                <div>
                                    <a href="">
                                        <div >
                                      
                                            <img src="" class="card-img-top" alt=""></img>
                                            <div class="card-body">
                                                <img src={kuvat[item.id-1]} className="" alt="Logo" />
                                                <h5 class="card-title">{item.tuotenimi}</h5>
                                                <p class="card-text">{item.tuotenimi}</p>
                                                <p class="card-text">{item.tuotekuvaus}</p>
                                                <p class="card-text">{item.id}</p>
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
                    </ul>




                </div>
            </div>
        </>
    );
}
