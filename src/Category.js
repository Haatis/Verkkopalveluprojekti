import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Category() {
  const URL = "HTTP://localhost/verkkokauppa/";
  const [search, setSearch] = useState("");
  const [tuotenimi, setTuotenimi] = useState("");
  const [hinta, setHinta] = useState("");
  const [tuotekuvaus, setTuotekuvaus] = useState("");
  const [items, setItems] = useState([]);
  const [kuva, setTuotekuva] = useState("");
  const { it } = useParams();

  useEffect(() => {
    let status = 0;
    fetch(URL + "category.php", {
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

  return (
    <>
      <div className="row">
        <div className="col-3 bg-secondary border-top border-bottom border-end border-dark">
          <h1>Haku</h1>
        </div>
        <div className="col-9 bg-secondary border-top border-bottom border-start border-dark">
          <h1>content</h1>

          <ul className="row">
            {items.map((item) => (
              <li className="card col-lg-6 col-md-12 text-center" key={item.id}>
                <div>
                  <a href="">
                    <div>
                      <img src="" className="card-img-top" alt=""></img>
                      <div className="card-body">
                        <img src={item.kuva} className="tuotekuva" alt="Logo" />
                        <h5 className="card-title">{item.tuotenimi}</h5>
                        <p className="card-text">{item.tuotenimi}</p>
                        <p className="card-text">{item.tuotekuvaus}</p>
                        <p className="card-text">{item.tuotetiivistelmä}</p>
                        <div className="vasen-pohja">
                          <a href="#" className="btn btn-primary">
                            <i className="fa fa-shopping-cart"></i>
                          </a>
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
