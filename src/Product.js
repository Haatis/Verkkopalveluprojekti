import rtx3090 from './tuoteimg/1.jpg';

export default function Product() {
    return (

        
                        <div className="row">
                        <div className="bg-light">
                            
                            <h2 className="ms-4">Gigabyte GeForce RTX3090</h2>
                            
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                            <img src={rtx3090} className="tuotesivukuva ms-5" alt="Logo" />
                            </div>
                               <div className="col-md-6 col-sm-12">
                                <h3 className="">Tuotekuvaus</h3>
                                <h5 className="me-5">Gigabyte GeForce RTX3090 24 GT GDDR6 Näytönohjain vain parasta haluavalle</h5>
                                </div>
                                </div>
                                
                                <div className="row">
                                <div className="col-6">
                                <a href="#" class="btn btn-primary col-7">Lisää ostoskoriin<i class="fa fa-shopping-cart"></i></a>
                                </div>
                                <div className="col-6">
                                <h4>150.00€</h4>
                                </div>
                                </div>
                                   </div>
                                     </div>
                        
                   

    )
}