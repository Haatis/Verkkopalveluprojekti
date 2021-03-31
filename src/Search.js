import { useState, useEffect } from "react";

export default function Search() {
  const URL = "HTTP://localhost/verkkokauppa/";
  const [search, setSearch] = useState("");
  const [tuotenimi, setTuotenimi] = useState("");
  const [hinta, setHinta] = useState("");
  const [tuotekuvaus, setTuotekuvaus] = useState("");
  const [kuva, setTuotekuva] = useState("");
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortSql, setSortSql] = useState("")

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

  useEffect(() => {
    if ("cart" in localStorage) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  function addToCart(item) {
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload(false);
  }

  function searchItem(e) {
    e.preventDefault();
    window.location.href = "http://localhost:3000/search?query=" + search;
  }

  const queryString = require("query-string");
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
        sort: sortSql,
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
  }, [sortSql]);



  function sort(e){
    if(e == 1){
      setSortSql("ORDER BY hinta ASC")
    }else if(e==2){
      setSortSql("ORDER BY hinta DESC")
    }else if(e==3){
      setSortSql("ORDER BY pvm ASC")
    }else if(e==4){
      setSortSql("ORDER BY pvm DESC")
    }else if(e==5){
      setSortSql("ORDER BY tuotenimi ASC")
    }else if(e==6){
      setSortSql("ORDER BY tuotenimi DESC")
    }
    
  }

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
            <button
              className="btn bt text-light btn-primary my-2 py-0 "
              type="submit"
            >
              Search
            </button>
          </form>
          <div>
            <select id="sortMethod" className="form-select" onChange={e => sort(e.target.value)}>
              <option selected>Lajittele</option>
              <option value="1">Hinta (pienin-suurin)</option>
              <option value="2">Hinta (suurin-pienin)</option>
              <option value="3">Uusin</option>
              <option value="4">Vanhin</option>
              <option value="5">Nimi (A-Ö)</option>
              <option value="6">Nimi (Ö-A)</option>
            </select>
          </div>
        </div>
        <div className="col-9 bg-secondary border-top border-bottom border-start  border-dark">
          <h1>content</h1>

          <div className="row">
            {items.map((item) => (
              <div
                className="card col-xl-3 col-lg-6 col-md-6 col-sm-12 p-0 text-center"
                key={item.id}
              >
                <a /* href={"/Product/" + item.id} */>
                  <div>
                    <img src="" className="card-img-top" alt=""></img>
                    <div className="card-body">
                      <img src={item.kuva} className="img-fluid" alt="Logo" />
                      <h5 className="card-title">{item.tuotenimi}</h5>
                      <p className="card-text text-left">{item.tuotekuvaus}</p>
                      <div className="vasen-pohja">
                        <button
                          onClick={() => addToCart(item.id)}
                          value={item.id}
                          className="btn btn-primary"
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      </div>
                      <div className="oikea-pohja">
                        <p>{item.hinta + "€"}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
