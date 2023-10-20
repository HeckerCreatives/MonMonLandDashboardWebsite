import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";
import img1 from "../../../../../assets/faq/faq.png"

const Game5 = () => {
    return (
        <>
        <MDBContainer className="">
        <MDBRow className="mt-5">
            <MDBCol>
            <h2>
            Is it okay if I have no Binance but have other wallets?
            </h2>
            <p>
            No, Monmonland only uses Binance as a means of transaction for easy use. Worry not, Monmonland Customer Service Support will be assisting players who want to learn how to create a Binance account. Transferring from other wallets are strictly prohibited inside the game for it may cause commotion and conflict on both parties. 
            </p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        <MDBContainer>
                <MDBRow>
                    <MDBCol className="d-flex align-items-center justify-content-center">
                        <img src={img1} alt="" className="img-fluid" style={{width: "100%", height: "90%"}}/>
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
        </>
    )
}

export default Game5;