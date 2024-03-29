import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";
import img1 from "../../../../../assets/faq/platform.png"

const General4 = () => {
    return (
        <>
        
        <MDBContainer className="">
        <MDBRow className="mt-5">
            <MDBCol>
            <h2>
            In what platforms is Monmonland available?
            </h2>
            <p>
            Monmonland, a highly anticipated mobile app, is about to make its big debut in the digital world. Exciting news for Android users the app will be available for them right from the start, promising an immersive experience.
            </p>
            <p>
            The team is all about providing a great experience for users on various mobile platforms. That's why they're actively working on bringing the app to iOS as well. iOS users, get ready for the adventure because it's coming your way very soon! Also the team's decision to cater to both Android and iOS users shows they're all about making sure everyone can enjoy Monmonland.
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

export default General4;