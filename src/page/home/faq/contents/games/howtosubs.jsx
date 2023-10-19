import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";


const Game3 = () => {
    return (
        <MDBContainer className="min-vh-100 d-flex align-items-center justify-content-center">
        <MDBRow className="">
            <MDBCol>
            <h2>
            How to Subscribe?
            </h2>
            <h2>Step 1.</h2>
            <p>Log in to your account and click the Shop section where you can see the Subscription.</p>

            <h2>Step 2.</h2>
            <p>If you still don’t have credits, you can add in-game credits manually or automatically in the cash-in section.</p>

            <h2>Step 3.</h2>
            <p>If credits are already enough, click the subscribe button and restart your application.</p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Game3;