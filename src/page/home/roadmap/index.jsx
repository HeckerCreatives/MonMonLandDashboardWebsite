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
      const sortedList = roadmap.sort((a, b) => a._id.localeCompare(b._id));
    return (
        <div className="">
        <MDBContainer fluid  className="d-flex justify-content-center roadmapbgcolor pt-5" id="roadmap">
        
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
        
        {sortedList.map((roadmaps,index) =>(
        <MDBRow className="circle">
        
        <MDBCol className={`roadmapholder text-center ${
        index === 1 || index === roadmap?.length - 1 ? 'roadmapholderright' : index % 2 === 0 ? 'roadmapholder' : 'roadmapholderright'
        }`} key={roadmaps._id}>

        <MDBCol className={`itemposition itemcolumn ${
        index === 1 || index === roadmap?.length - 1 ? 'itempositionright' : index % 2 === 0 ? 'itemposition' : 'itempositionright'
        }`} >
        
        <MDBTypography className="mb-1 fw-bold text-white" >{roadmaps?.title?.length > 50 ? `${roadmaps?.title.substring(0,50)}...`: roadmaps?.title}</MDBTypography>

        <MDBCol  className="woodcharbg">
        <img src={`${process.env.REACT_APP_API_URL}${roadmaps?.image}`} alt="" id="woodchar" />
        </MDBCol>            

        <MDBTypography className="mb-1 fw-bold text-wrap text-white m-lg-2" >{roadmaps?.subtitle?.length > 50 ? `${roadmaps.subtitle.substring(0,50)}...`: roadmaps?.subtitle}</MDBTypography>
        
        <img src={seemore} alt="" className="mt-2 zoom-roadmap seemorebtn" 
        onClick={() => {
            setTitle(roadmaps.title)
            setRoadmapDescription(roadmaps.description)
            setRoadMapImage(roadmaps.image)
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
                <MDBModalHeader className="seamlessrd">
                <MDBModalTitle className="text-light">{roadmaptitle}</MDBModalTitle>
                {/* <MDBBtn className='btn-close' color='none' onClick={()=> setActiveModal(null)}></MDBBtn> */}
                </MDBModalHeader>
                <MDBModalBody>
                <MDBCard  style={{background: "#EDCAB4",}}>
                    <MDBCardBody className="d-flex  justify-content-center">
                    <img alt="" src={`${process.env.REACT_APP_API_URL}${roadmapimage}`}/>
                    </MDBCardBody>
                </MDBCard>
                <MDBCardText className="text-dark mt-3 mb-0 fw-bold">Description</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                    <MDBCardBody>
                    <ul>
                        {roadmapdescription.split('\n').map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </MDBCardBody>
                </MDBCard>
                
                </MDBModalBody>
                <MDBModalFooter className="seamlessrd">
                <MDBBtn className="text-dark btn-transparent" style={{background: "#FCF4A0"}} onClick={()=> setActiveModal(null)}>
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