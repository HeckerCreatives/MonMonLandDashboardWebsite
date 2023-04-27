import React, {useState, useEffect} from "react";
import { MDBContainer,
        MDBRow,
        MDBCol,
        MDBTypography,
        MDBBtn,
        MDBModal,
        MDBModalDialog,
        MDBModalContent,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,} from "mdb-react-ui-kit";
import "./index.css"
import woodcutting from "../../../assets/character/Wood Cutting.png"
import seemore from "../../../assets/roadmap/see more btn.png"

const Roadmap = () => {
    const [roadmap, setRoadmap] = useState([])
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = (index) => {        
        setBasicModal(index);
      };

    useEffect(()=>{
        fetch('http://localhost:4000/roadmap/find')
        .then(result => result.json())
        .then(data => {
            setRoadmap(data)
            
        })
      },[])

    return (
        <div className="">
        <MDBContainer fluid  className="d-flex justify-content-center roadmapbgcolor" id="roadmap">
        <MDBTypography className="titlefontsize text-warning text-center fw-bold">
            ROADMAP
        </MDBTypography>
        <MDBContainer className="line">
        
        
        {roadmap.map((roadmaps,index) =>(
        <MDBRow className="circle">
        <MDBCol className={`roadmapholder text-center ${
        index === 1 || index === roadmap.length - 1 ? 'roadmapholderright' : index % 2 === 0 ? 'roadmapholder' : 'roadmapholderright'
        }`} key={roadmaps._id}>

        <MDBCol className={`itemposition itemcolumn ${
        index === 1 || index === roadmap.length - 1 ? 'itempositionright' : index % 2 === 0 ? 'itemposition' : 'itempositionright'
        }`} >
        
        <MDBTypography className="fw-bold text-white" >{roadmaps.title}</MDBTypography>

        <MDBCol  className="woodcharbg">
        <img src={woodcutting} alt="" id="woodchar" />
        </MDBCol>            

        <MDBTypography className="fw-bold text-wrap text-white m-0" >{roadmaps.description}</MDBTypography>
        <MDBBtn color="none" onClick={() => toggleShow(index)}>
        <img src={seemore} alt="" className="seemorebtn"/>
        </MDBBtn>
        <MDBModal show={basicModal === index} tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => toggleShow(false)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>...</MDBModalBody>

                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => toggleShow(false)}>
                    Close
                </MDBBtn>                
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        
        
        </MDBCol>


        </MDBCol>
        </MDBRow>
        ))}

        

        </MDBContainer>
        </MDBContainer>
        </div>
        
    )
}

export default Roadmap;