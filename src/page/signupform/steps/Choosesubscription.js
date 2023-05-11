import { MDBBtn, MDBCard, MDBCardBody, MDBCheckbox, MDBContainer } from "mdb-react-ui-kit";
import React from "react";

const ChooseSubscription = () => {
    return(
        <MDBContainer fluid>
        <MDBCard>
            <MDBCardBody>
            <MDBCheckbox name='flexCheck' value='' id='flexCheckChecked' label='Pearl Subscription' defaultChecked />
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Ruby Subscription' />
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Emerald Subscription' />
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Diamond Subscription' />
            </MDBCardBody>
            <MDBBtn>Back</MDBBtn>
            <MDBBtn>Proceed</MDBBtn>
        </MDBCard>
        </MDBContainer>
    )
}

export default ChooseSubscription;