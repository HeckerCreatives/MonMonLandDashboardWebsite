import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";


const Mop2 = () => {
    return (
        <MDBContainer className="min-vh-100 d-flex align-items-center justify-content-center">
        <MDBRow className="">
            <MDBCol>
            <h2>
            How to use a manual payment method
            </h2>
            <h3>Step 1.</h3>
            <p>Join the queue on the website by clicking “Join the Queue”. Find your preferred admin, click it, and wait for your turn. You will be notified if it is your turn, and you will enter the manual top-up room where you can talk to the admin.</p>

            <h3>Step 2.</h3>
            <p>Your chosen admin will talk to you about the process of subscribing to the game. If you still don’t have a Binance account, you will be taught how to create one.</p>

            <h3>Step 3.</h3>
            <p>As you create and deposit money in your account, you will now process the payment for a subscription. You will be given a wallet address where you will deposit your Binance money. After depositing, you will be required to send a receipt from Binance, which will serve as proof of payment.</p>

            <h3>Step 4.</h3>
            <p>After the admin confirms your payment, your account will be funded inside the game. You can use your funds to buy in-game purchases.</p>

            <h3>Step 5.</h3>
            <p>Reconnect your game to see your updated account money.</p>
    
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Mop2;