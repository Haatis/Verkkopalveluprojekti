import { useState, useEffect } from "react";


export default function Content() {

    const URL = "HTTP://localhost/verkkokauppa/"
    const kuvaURL = "http://localhost/verkkokauppa/img/"
    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [items, setItems] = useState([]);
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

    

        let status = 0;
    function searchItem(e) {
        e.preventDefault();
        let status = 0
        fetch(URL + "search.php", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                search: search
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
    }




    return (
        <>
            <div className="row">


                <div className="col-3 bg-secondary border border-dark">
                    <h1>Haku</h1>
                    <form class="d-flex" onSubmit={searchItem}>
                        <input class="form-control me-2" type="search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                        <button class="btn bt text-light" type="submit">Search</button>
                    </form>
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
                                      
                                            <img src="" className="card-img-top" alt=""></img>
                                            <div className="card-body">
                                                <img src={item.kuva} className="" alt="Logo" />
                                                <h5 className="card-title">{item.tuotenimi}</h5>
                                                <p className="card-text">{item.tuotenimi}</p>
                                                <p className="card-text">{item.tuotekuvaus}</p>
                                                <p className="card-text">{item.id}</p>
                                                <div className="vasen-pohja">
                                                    <a href="#" className="btn btn-primary"><i className="fa fa-shopping-cart"></i></a>
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
