import rtx3090 from './tuoteimg/rtx3090.jpg';
import asus from './tuoteimg/asus.jpg';
import adrus from './tuoteimg/adrus.jpg';
import geforce from './tuoteimg/geforce.jpg';



export default function Home() {
    return (
        <>

        <div class="row">

        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner ">
                <div className="carousel-item active ">
                <img src={geforce} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block blackcolor">
                    {/* <h5>Gigabyte GeForce RTX3090</h5>
                    <p>Gigabyte GeForce RTX3090<br></br> 24 GT GDDR6<br></br> Näytönohjain vain parasta haluavalle</p>
                    <p>150$</p> */}
                </div>
                </div>
                <div className="carousel-item">
                <img src={asus} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block blackcolor">
                    {/* <h5>Gigabyte GeForce RTX3090</h5>
                    <p>Gigabyte GeForce RTX3090<br></br> 24 GT GDDR6<br></br> Näytönohjain vain parasta haluavalle</p>
                    <p>150$</p> */}
                </div>
                </div>
                <div className="carousel-item">
                <img src={adrus} className="d-block w-100" alt="..."></img>
                <div className="carousel-caption d-none d-md-block blackcolor">
                    {/* <h5>Gigabyte GeForce RTX3090</h5>
                    <p>Gigabyte GeForce RTX3090<br></br> 24 GT GDDR6<br></br> Näytönohjain vain parasta haluavalle</p>
                    <p>150$</p> */}
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className="row">
           <h1>Päivän tarjoukset</h1>
        </div>
        <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                            <img src={rtx3090} className="" alt="Logo" />
                                <h5 class="card-title">Gigabyte GeForce RTX3090</h5>
                                <p class="card-text">Gigabyte GeForce RTX3090<br></br> 24 GT GDDR6<br></br> Näytönohjain vain parasta haluavalle</p>
                               <div class="vasen-pohja">
                                <a href="#" class="btn btn-primary"><i class="fa fa-shopping-cart"></i></a>
                                </div>
                                <div class="oikea-pohja">
                                <p>150$</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                            <img src={rtx3090} className="" alt="Logo" />
                                <h5 class="card-title">RTX3090</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Lisää ostoskoriin</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                            <img src={rtx3090} className="" alt="Logo" />
                                <h5 class="card-title">RTX3090</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Lisää ostoskoriin</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                            <img src={rtx3090} className="" alt="Logo" />
                                <h5 class="card-title">RTX3090</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Lisää ostoskoriin</a>
                            </div>
                        </div>
                    </a>
                </div>
        </div>

        <div class="row">
        <h1>Comm's Suosittelee</h1>
        </div>
        <div class="row">
        <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>
        </div>
        <div class="row">
        <div class="card col-3">
                    <a href="">
                        <div >
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="card col-3">
                    <a href="">
                        <div>
                            <img src="" class="card-img-top" alt=""></img>
                            <div class="card-body">
                                <h5 class="card-title">Card with stretched link</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </a>
                </div>
        </div>
     
     </>
    )
}