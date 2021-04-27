import React from "react"
import {Link} from "react-router-dom";

const Payment = () => {
    return (
        <div className="order-confirm-container">
            <img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/18/okok.gif" alt="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/18/okok.gif"/>
            <h1>Betaling geslaagd</h1>
            <h2>U zal zo dadelijk een bevestigingsmail ontvangen.</h2>
            <Link to="/">Terug naar homepagina</Link>
        </div>
    )
}
export default Payment
