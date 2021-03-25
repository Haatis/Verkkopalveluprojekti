import React from 'react';
import { useState } from "react";

export default function Order() {
    const [show, setShow]=useState(false)

    return (
        <>
       <div className="row bg-light">
            <div className="col-6">
        <form>
        
  
      <h4 className="m-3">Toimitusosoite</h4>
      <div className="row">
<div class="mb-3 col-5">
    <label for="nimi" class="form-label">Etu- ja sukunimi</label>
    <input type="text" placeholder="Etu ja sukunimi" class="form-control col-2" id="nimi"/>
    
  </div>
  <div class="mb-3 col-5">
    <label for="puhelin" class="form-label ">Puhelin</label>
    <input type="text" placeholder="Puhelin" class="form-control" id="puhelin"/>
  </div>
  </div>
  <div className="row">
  <div class="mb-3 col-5">
    <label for="osoite" class="form-label">Katuosoite</label>
    <input type="text" placeholder="Katuosoite" class="form-control" id="osoite"/>
  </div>
  <div class="mb-3 col-5">
    <label for="posti" class="form-label">Postinumero</label>
    <input type="text" placeholder="Postinumero" class="form-control" id="posti"/>
  </div>
  </div>

  <div class="form-check form-check">
  <input class="form-check-input" onChange={()=>setShow(false)} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
  <label class="form-check-label" for="inlineRadio1">Laskutusosoitteeni on sama kuin toimitusosoitteeni</label>
</div>
<div class="form-check form-check">
  <input class="form-check-input" onChange={()=>setShow(true)} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
  <label class="form-check-label" for="inlineRadio2">Laskutusosoitteeni on eri kuin toimitusosoitteeni</label>
</div>



  {show?<div><h4 className="m-3">Laskuosoite</h4><div className="row"><div class="mb-3 col-5">
    <label for="nimi2" class="form-label">Etu- ja sukunimi</label>
    <input type="text" placeholder="Etu ja sukunimi" class="form-control" id="nimi2"/>
    
  </div>
  <div class="mb-3 col-5">
    <label for="puhelin2" class="form-label">Puhelin</label>
    <input type="text" placeholder="Puhelin" class="form-control" id="puhelin2"/>
  </div>
  </div>
  <div className="row">
  <div class="mb-3 col-5">
    <label for="osoite2" class="form-label">Katuosoite</label>
    <input type="text" placeholder="Katuosoite" class="form-control" id="osoite2"/>
  </div><div class="mb-3 col-5">
    <label for="posti2" class="form-label">Postinumero</label>
    <input type="text" placeholder="Postinumero" class="form-control" id="posti2"/>
  </div></div></div>:null}

   <div class="mb-3 col-10">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <h4>Toimitustapa</h4>
    <input type="radio" class="btn-check" name="kuljetus" id="kotiin" autocomplete="off"/>
    <label class="btn btn-outline-secondary" for="kotiin">Kotiinkuljetus</label>

    <input type="radio" class="btn-check" name="kuljetus" id="myymälään" autocomplete="off"/>
    <label class="btn btn-outline-secondary ms-2" for="myymälään">Nouto lähimmästä myymälästä</label><br></br>

    <h4 className="mt-4">Maksutapa</h4>

  <input type="radio" class="btn-check" name="maksu" id="pankki" autocomplete="off"/>
    <label class="btn btn-outline-secondary" for="pankki">Verkkopankki</label>

    <input type="radio" class="btn-check" name="maksu" id="kortti" autocomplete="off"/>
    <label class="btn btn-outline-secondary ms-2" for="kortti">Korttimaksu</label><br></br>
        
        
  <button type="submit" class="btn btn-primary my-4">Submit</button>
  
  
  
  
  

  
    </form>
    </div>
    <div className="col-5 mt-5"><h3>OSTOSKORI NÄKYVIIN TÄHÄN</h3></div>
  </div>
    
        </>
    )
}