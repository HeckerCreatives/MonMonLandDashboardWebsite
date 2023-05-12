import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useState } from "react";
import './choosesubscription.css'


const ChooseSubscription = ({nextStep, prevStep}) => {
    const [selected, setSelected] =useState(false)
    const handleSubmit = (e) =>{
        e.preventDefault()
        nextStep()
        // prevStep()
    }
    const choose = () =>{
        setSelected(!selected)
    }
    return (
        <MDBContainer className="text-center text-black mt-5 w-50">
            <MDBTypography tag='h2' className="fw-bold">Choose your Subscription</MDBTypography>
            <MDBCard>
            <form onSubmit={handleSubmit}>
                <MDBCardBody>
                    <MDBCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</MDBCardText>
                    <MDBCol>
                    <div className={selected ? 'active borders col-5 mx-auto mb-2': 'borders col-5 mx-auto mb-2' }>
                        <label >
                        <input type="checkbox" checked={selected} onChange={choose} hidden/>
                        Pearl Subscription - <span className="prc">Free</span></label>
                    </div>
                    <div className={selected ? 'active borders col-5 mx-auto mb-2': 'borders col-5 mx-auto mb-2' }>
                        <label>
                        <input type="checkbox" checked={selected} onChange={choose} hidden/>
                        Ruby Subscription - <span className="prc">Php 999.00</span>
                        </label>
                    </div>
                    <div className={selected ? 'active borders col-5 mx-auto mb-2': 'borders col-5 mx-auto mb-2' }>
                        <label>
                        <input type="checkbox" checked={selected} onChange={choose} hidden/>
                        Emerald Subscription - <span className="prc">Php 2,499.00</span></label>
                    </div>
                    <div className={selected ? 'active borders col-5 mx-auto mb-2': 'borders col-5 mx-auto mb-2' }>
                        <label>
                        <input type="checkbox" checked={selected} onChange={choose} hidden/>
                        Diamond Subscription - <span className="prc">Php 4,999.00</span></label>
                    </div>
                    </MDBCol>
                    
                    <MDBCol className="d-flex justify-content-end">
                    <MDBBtn type="submit" className="bgblue">Next</MDBBtn>
                    </MDBCol>
                    
                </MDBCardBody>
            </form>
            </MDBCard>
        </MDBContainer>
    )
}

export default ChooseSubscription;