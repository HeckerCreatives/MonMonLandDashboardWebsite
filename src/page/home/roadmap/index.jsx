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
        MDBModalFooter,
        MDBSpinner,
        MDBCard,
        MDBCardBody,
        MDBCardText,} from "mdb-react-ui-kit";
import "./index.css"
import woodcutting from "../../../assets/character/Wood Cutting.png"
import seemore from "../../../assets/roadmap/see more btn.png"

const Roadmap = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [roadmap, setRoadmap] = useState([])
    const [activeModal, setActiveModal] = useState(null);
    const [roadmapdescription, setRoadmapDescription] = useState('');
    const [roadmaptitle, setTitle] = useState('');
    const [roadmapimage, setRoadMapImage] = useState('');

    // const toggleShow = (index) => {        
    //     setBasicModal(index);
    //   };

    useEffect(()=>{
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}roadmap/find`)
        .then(result => result.json())
        .then(data => {
            setRoadmap(data.reverse().slice(0,4))
            setIsLoading(false)
        })
      },[])

    return (
        <div className="">
        <MDBContainer fluid  className="d-flex justify-content-center roadmapbgcolor" id="roadmap">
        
        {isLoading ?
        <div className="text-center">
        <MDBTypography className="titlefontsize text-warning fw-bold">
        ROADMAP        
        </MDBTypography> 
        <MDBSpinner color="warning"></MDBSpinner>
        </div> 
        :
        <>
        <MDBTypography className="titlefontsize text-warning text-center fw-bold">
        ROADMAP        
        </MDBTypography>
        <MDBContainer className="line text-center">                
        
        {roadmap.map((roadmaps,index) =>(
        <MDBRow className="circle">
        
        <MDBCol className={`roadmapholder text-center ${
        index === 1 || index === roadmap.length - 1 ? 'roadmapholderright' : index % 2 === 0 ? 'roadmapholder' : 'roadmapholderright'
        }`} key={roadmaps._id}>

        <MDBCol className={`itemposition itemcolumn ${
        index === 1 || index === roadmap.length - 1 ? 'itempositionright' : index % 2 === 0 ? 'itemposition' : 'itempositionright'
        }`} >
        
        <MDBTypography className="fw-bold text-white" >{roadmaps.title.length > 50 ? `${roadmaps.title.substring(0,50)}...`: roadmaps.title}</MDBTypography>

        <MDBCol  className="woodcharbg">
        <img src={woodcutting} alt="" id="woodchar" />
        </MDBCol>            

        <MDBTypography className="fw-bold text-wrap text-white m-0" >{roadmaps.description.length > 50 ? `${roadmaps.description.substring(0,50)}...`: roadmaps.description}</MDBTypography>
        
        <img src={seemore} alt="" className="seemorebtn" 
        onClick={() => {
            setTitle(roadmaps.title)
            setRoadmapDescription(roadmaps.description)
            setActiveModal(true)
        }}/>
        
        </MDBCol>
        </MDBCol>
       
        </MDBRow>
        
         
        ))}
        
        
        </MDBContainer>
        </>
        }
        
        <MDBModal  show={activeModal} onClick={()=> setActiveModal(null)} tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">{roadmaptitle}</MDBModalTitle>
                {/* <MDBBtn className='btn-close' color='none' onClick={()=> setActiveModal(null)}></MDBBtn> */}
                </MDBModalHeader>
                <MDBModalBody>
                <MDBCard  style={{background: "#EDCAB4",}}>
                    <MDBCardBody className="d-flex  justify-content-center">
                    <img alt="" src={woodcutting}/>
                    </MDBCardBody>
                </MDBCard>
                <MDBCardText className="text-dark mt-3 mb-0 fw-bold">Description</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                    <MDBCardBody>                    
                    {roadmapdescription}
                    </MDBCardBody>
                </MDBCard>
                
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={()=> setActiveModal(null)}>
                    Close
                </MDBBtn>                
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        </MDBContainer>
        </div>
        
    )
}

export default Roadmap;