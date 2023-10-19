import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";


const Game4 = () => {
    return (
        <MDBContainer className="min-vh-100 d-flex align-items-center justify-content-center">
        <MDBRow className="">
            <MDBCol>
            <h2>
            How to cash out?
            </h2>
            <h2>Step 1.</h2>
            <p>First of all, you need to fill up your Payment Method by copying your Binance ID. Then click Update.</p>

            <h2>Step 2.</h2>
            <p>After completing your Payment Details, go to your dashboard and click withdraw.</p>

            <h2>Step 3.</h2>
            <p>In the withdraw section, you will be required to put the amount you want to withdraw and click Request.</p>

            <h2>Step 4.</h2>
            <p>Wait for your cashout request status to be Approved.</p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Game4;