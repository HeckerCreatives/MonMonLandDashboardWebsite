import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";


const Unilevel1 = () => {
    return (
        <MDBContainer className="min-vh-100 d-flex align-items-center justify-content-center">
        <MDBRow className="">
            <MDBCol>
            <h2>
            What is Unilevel?
            </h2>
            <p>
            A unilevel compensation plan is a common feature in multi-level marketing (MLM) or network marketing companies. Under this plan, distributors and independent representatives receive compensation not only for their own sales but also for the sales made by the distributors they've brought into their network. Unlike more complex MLM compensation plans like binary or matrix structures, the unilevel plan is characterized by its straightforward design. 
            </p>
            <p>
            Monmonland uses a unilevel system to invite players and receive commission rewards. By copying the link in your profile, you can invite people and make them under you, which makes you a level 1. Invite as many as you can until you reach level 6 and make it to the top. 
            </p>
            <p>
            You can automatically receive your commission rewards from your invites as they subscribe in any of the subscription package
            </p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Unilevel1;