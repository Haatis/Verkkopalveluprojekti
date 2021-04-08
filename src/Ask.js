import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  
import {Link} from 'react-router-dom'

export default function Ask() {
    const URL = "HTTP://localhost/verkkokauppa/"
    const [items, setItems] = useState([]);
    const { it } = useParams();

    useEffect(() => {
      let status = 0;
      fetch(URL + "retrieve.php", {
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
    }, [it]);
   
    return (
      
<div className="row">
    <div className="bg-light">
      
{items.map((item) => (
        <div className="" key={item.id}>
                    
                        <div >
                            <div className="priceinfo mt-2 mb-2">
                            <h2 className="ms-4 title">{item.tuotenimi}</h2>
                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                            <img src={item.kuva} className="tuotesivukuva col-sm-12 col-md-12" alt="Logo" />
                            </div>
                            
                              <div className="col-6">
                              <h3>Kysy tuotteesta</h3>
                                <form>
                                <div className="row">
                        <div class="mb-3 col-5">
                          <label for="nimi" class="form-label">Etu- ja sukunimi</label>
                        <input  type="text" placeholder="Etu ja sukunimi" class="form-control col-2" id="nimi"/>
                    </div>

                   <div class="mb-3 col-5">
                    <label for="puhelin" class="form-label ">Puhelin</label>
                   <input type="text" placeholder="Puhelin" class="form-control" id="puhelin"/>
                  </div>

                  <div class="mb-3 col-10">
                   <label for="exampleInputEmail1" class="form-label">Sähköpostiosoite</label>
                     <input type="email" placeholder="Sähköpostiosoite" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>

                  <div class="mb-3 col-10">
                   <label for="aihe" class="form-label">Aihe</label>
                     <input type="text" placeholder="Aihe" class="form-control" id="aihe"/>
                  </div>

                  <div class="mb-3 col-10">
                   <label for="viesti" class="form-label">Viesti</label>
                     <textarea placeholder="Viesti" class="form-control" id="viesti"/>
                  </div>
                  </div>
       
                                </form>
                                </div>
                         
                          
                                </div>
                            </div>
                        </div>
                </div>
                
                 ))}
                 </div>
        </div>    

    )
}