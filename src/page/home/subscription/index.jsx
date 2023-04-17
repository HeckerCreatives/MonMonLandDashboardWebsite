import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard } from "mdb-react-ui-kit";
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
const Subscription = () => {
    return (
        <MDBContainer fluid className="d-flex flex-column align-items-center justify-content-center">
        <MDBRow>
            <MDBCol className="mt-5">
                <MDBTypography className="h2 text-warning">
                    <strong>Subscription</strong>
                </MDBTypography>
            </MDBCol>
        </MDBRow>

        <MDBRow>
        <MDBCol className="text-center">
        
        <MDBCard>
        <div class="card-body">
        <img src={ruby}></img>
            <h5 class="card-title">Ruby Subscription</h5>
            <h6 class="card-subtitle">999.00</h6>
            <ul>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
            </ul>
            <button type="button" class="btn btn-warning"><strong>SUBSCRIBE NOW</strong></button>
        </div>
        </MDBCard>
        </MDBCol>
        
        <MDBCol className="text-center">
        <div class="card">
        <div class="card-body">
            <img src={emerald}></img>
            <h5 class="card-title">Emerald Subscription</h5>
            <h6 class="card-subtitle">2,499.00</h6>
            <ul>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
            </ul>
            <button type="button" class="btn btn-warning"><strong>SUBSCRIBE NOW</strong></button>
        </div>
        </div>
        </MDBCol>
        
        <MDBCol className="text-center">
        <div class="card">
        <div class="card-body">
            <img src={diamond}></img>
            <h5 class="card-title">Diamond Subscription</h5>
            <h6 class="card-subtitle">4,999.00</h6>
            <ul>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
                <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id rhoncus neque. Sed a mauris urna. Proin ut lorem eu urna tincidunt interdum. Nullam eu metus vel urna ullamcorper volutpat. Sed consectetur, turpis a feugiat tincidunt, mi quam varius mi, at cursus justo risus ut urna.
                </li>
            </ul>
            <button type="button" class="btn btn-warning"><strong>SUBSCRIBE NOW</strong></button>
        </div>
        </div>
        </MDBCol>
        </MDBRow>
        
                      
        </MDBContainer>
    )
}

export default Subscription;