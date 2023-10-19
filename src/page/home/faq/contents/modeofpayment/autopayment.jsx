import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";


const Mop1 = () => {
    return (
        <MDBContainer className="min-vh-100 d-flex align-items-center justify-content-center">
        <MDBRow className="">
            <MDBCol>
            <h2>
            How to use an automated payment method?
            </h2>
            <h3>Step 1.</h3>
            <p>Click “Add Fund” and you will be transported into the funding website where you will choose which fund you want to add or bundles you want to buy.</p>

            <h3>Step 2.</h3>
            <p>After choosing your preferred funding, you will then be directed to Coinbase where you will choose two options. If you have a Coinbase wallet, you can proceed to use the Coinbase wallet. If not, proceed with the USDT option.</p>

            <h3>Step 3.</h3>
            <p>Proceeding with the USDT option, you will see a network address referring to Monmonland ERC-20 Network address. You will send the payment and wait for the transaction to be completed.</p>

            <h3>Step 4.</h3>
            <p>Once the transaction is completed, wait for the Coinbase transaction to redirect to the admin’s website. (Note: wait for the redirection or else you won’t receive the funds that you purchased).</p>

            <h3>Step 5.</h3>
            <p>Once you’re in the redirected page, you will wait for the transaction to be successful.</p>
    
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Mop1;