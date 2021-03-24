import rtx3090 from './tuoteimg/1.jpg';
import kuva1 from './tuoteimg/1.jpg';
import kuva2 from './tuoteimg/2.jpg';
import kuva3 from './tuoteimg/3.jpg';
import kuva4 from './tuoteimg/4.jpg';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
    const URL = "HTTP://localhost/verkkokauppa/"
    const [search, setSearch] = useState("")
    const [tuotenimi, setTuotenimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [tuotekuvaus, setTuotekuvaus] = useState("");
    const [items, setItems] = useState([]);
    const kuvat = [kuva1, kuva2, kuva3, kuva4]
    const { it } = useParams();
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
    <div className="bg-light">
    
{items.splice(it-1,1).map((item) => (
        <div className="" key={item.id}>
                    
                        <div >
                            <div className="">
                            <h2 className="ms-4">{item.tuotenimi}</h2>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                            <img src={kuvat[item.id-1]} className="tuotesivukuva" alt="Logo" />
                            </div>
                            <div className="col-md-6 col-sm-12"> 
                            <h3>Tuotekuvaus</h3>
                            <h5 className="me-5">{item.tuotekuvaus}</h5>
                            <h4>{item.hinta + "€"}</h4>
                            <a href="#" className="btn btn-primary col-5 p-2">Lisää ostoskoriin<i className="fa fa-shopping-cart"></i></a>
                            </div>
                                </div>
                            </div>
                        </div>
                </div>
                
                 ))}
                 </div>
        </div>     
    </>

    )
}