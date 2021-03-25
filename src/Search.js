import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import querystring from 'query-string'

export default function Search() {
  const URL = "HTTP://localhost/verkkokauppa/";
  const [search, setSearch] = useState("");
  const [tuotenimi, setTuotenimi] = useState("");
  const [hinta, setHinta] = useState("");
  const [tuotekuvaus, setTuotekuvaus] = useState("");
  const [kuva, setTuotekuva] = useState("");
  const [items, setItems] = useState([]);

  /*
  useEffect(() => {
    //näyttää kaikki tuotteet frontendissä
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
*/

  function searchItem(e) {
    e.preventDefault();
    window.location.href = "http://localhost:3000/search?query=" + search;
  }

  const queryString = require('query-string');
const parsed = queryString.parse(window.location.search);


  useEffect(() => {
        let status = 0;
        fetch(URL + "search.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            search: parsed.query,
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
        <div className="col-3 bg-secondary border-top border-bottom border-end  border-dark">
          <h1>Haku</h1>
          <form className="d-flex" onSubmit={searchItem}>
            <input
              className="form-control me-2 my-2"
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn bt text-light btn-primary my-2 py-0 " type="submit">
              Search
            </button>
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
        <div className="col-9 bg-secondary border-top border-bottom border-start  border-dark">
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
