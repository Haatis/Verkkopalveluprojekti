import React from 'react'


export default function Cart() {
    return (
        <div className="row">
            <h1>Shopping cart</h1>
            <h5 className="text">Products:</h5>
            <p className="text"><button className="btn-sm btn-warning "><i class="fa fa-trash-alt"></i></button></p>

            <div style={{padding:0}}>
                <p className="text ms-2">Coupons:</p>
                <p className="text"><input id="coupon" type="text" className="form-label col-4 ms-2"></input></p>
            </div>

            <h2 className="text"><button className="btn btn-own right">Checkout</button> </h2>
        </div>
    )
}