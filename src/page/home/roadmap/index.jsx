import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography,} from "mdb-react-ui-kit";
import "./index.css"
import woodcutting from "../../../assets/character/Wood Cutting.png"
import seemore from "../../../assets/roadmap/see more btn.png"

const Roadmap = () => {
    return (
        <div className="">
        <MDBContainer fluid  className="d-flex justify-content-center roadmapbgcolor" id="roadmap">
        <MDBTypography className="titlefontsize text-warning text-center fw-bold">
            ROADMAP
        </MDBTypography>
        <MDBContainer className="line">
        
        <MDBRow className="circle">
            <MDBCol className="roadmapholder text-center">

            <MDBCol className="itemposition itemcolumn" >
            <MDBTypography className="fw-bold text-white" >Lorem Ipsum</MDBTypography>

            <MDBCol  className="woodcharbg">
            <img src={woodcutting} alt="" id="woodchar" />
            </MDBCol>            

            <MDBTypography className="fw-bold text-wrap text-white m-0" >Lorem Ipsum height of the content inside the section.</MDBTypography>

            <img src={seemore} alt="" className="seemorebtn"/>
            </MDBCol>
            

            </MDBCol>

        </MDBRow>
        <MDBRow className="circle">
            <MDBCol className="roadmapholderright text-center">
            <MDBCol className="itempositionright itemcolumn" >
            <MDBTypography className="fw-bold text-white" >Lorem Ipsum</MDBTypography>

            <MDBCol  className="woodcharbg">
            <img src={woodcutting} alt="" id="woodchar" />
            </MDBCol>            

            <MDBTypography className="fw-bold text-wrap text-white m-0" >Lorem Ipsum height of the content inside the section.</MDBTypography>

            <img src={seemore} alt="" className="seemorebtn"/>
            </MDBCol>
            
            </MDBCol>
        </MDBRow>

        <MDBRow className="circle">
            <MDBCol className="roadmapholder text-center">
            
            <MDBCol className="itemposition itemcolumn" >
            <MDBTypography className="fw-bold text-white" >Lorem Ipsum</MDBTypography>

            <MDBCol  className="woodcharbg">
            <img src={woodcutting} alt="" id="woodchar" />
            </MDBCol>            

            <MDBTypography className="fw-bold text-wrap text-white m-0" >Lorem Ipsum height of the content inside the section.</MDBTypography>

            <img src={seemore} alt="" className="seemorebtn"/>
            </MDBCol>
            
            </MDBCol>
        </MDBRow>

        <MDBRow className="circle">
            <MDBCol className="roadmapholderright text-center">

            <MDBCol className="itempositionright itemcolumn" >
            <MDBTypography className="fw-bold text-white" >Lorem Ipsum</MDBTypography>

            <MDBCol  className="woodcharbg">
            <img src={woodcutting} alt="" id="woodchar" />
            </MDBCol>            

            <MDBTypography className="fw-bold text-wrap text-white m-0" >Lorem Ipsum height of the content inside the section.</MDBTypography>

            <img src={seemore} alt="" className="seemorebtn"/>
            </MDBCol>
            
            </MDBCol>
        </MDBRow>

        </MDBContainer>
        </MDBContainer>
        </div>
        
    )
}

export default Roadmap;