import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography, MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText, 
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,MDBIcon} from "mdb-react-ui-kit";
    import React, {useState} from "react";
    import "./index.css"
    import woodcutting from "../../../assets/character/Wood Cutting.png"
const Media = () => {
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    return (
        <MDBContainer fluid className="px-0">

        {/* 1st */}
        <MDBContainer fluid className="headerbg">

            <MDBContainer className="w-90">
                <MDBRow className="d-flex align-items-center justify-content-center" style={{height: "75vh"}}>
                    <MDBCol>
                    </MDBCol>
                    <MDBCol className="text-end">
                        <MDBTypography tag="h2">Welcome</MDBTypography>
                        <MDBTypography tag="h4">Media Photos</MDBTypography>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
             
        </MDBContainer>

        {/* 2nd */}

        <MDBContainer fluid className="px-0 pt-5 mt-5 pb-5 mb-5">

            <MDBContainer className="text-center">
                <MDBTypography tag="h2">Media's</MDBTypography>
                <MDBTypography tag="p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</MDBTypography>
            </MDBContainer>

            <MDBContainer fluid className="custom-media-btns py-5">
                <MDBBtn>All</MDBBtn>
                <MDBBtn>Announcement</MDBBtn>
                <MDBBtn>Banner</MDBBtn>
                <MDBBtn>Icon</MDBBtn>
                <MDBBtn>Videos</MDBBtn>
                <MDBBtn>Etc</MDBBtn>
            </MDBContainer>

            <MDBContainer fluid className="custom-media-cards">
                <div style={{opacity: "1", transform: "none"}} onClick={toggleShow}>
                    <div className="custom-media-image-card position-relative">
                        <img src={woodcutting} alt=""/>
                    </div>
                    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' staticBackdrop>
                        <MDBModalDialog size="lg" centered>
                        <MDBModalContent>
                        <MDBModalHeader>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                            <MDBModalBody className="text-center">
                                <img src={woodcutting} alt="" className="img-fluid"/>
                            </MDBModalBody>
                            <MDBModalFooter>
                            <MDBBtn>Download</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </div>

                <div style={{opacity: "1", transform: "none"}}>
                    <div className="custom-media-image-card position-relative">
                        <img src={woodcutting} alt=""/>
                    </div>
                </div>
                <div style={{opacity: "1", transform: "none"}}>
                    <div className="custom-media-image-card position-relative">
                        <img src={woodcutting} alt=""/>
                    </div>
                </div>
            </MDBContainer>
            <div className="d-flex justify-content-center text-center mt-4">
            <MDBBtn className="mx-2">
            <MDBIcon fas icon="caret-left" size="2x"/>
            </MDBBtn>

            <MDBBtn className="mx-2">
            <MDBIcon fas icon="caret-right" size="2x"/>
            </MDBBtn>
            </div>

        </MDBContainer>
            
        </MDBContainer>
    )
}

export default Media;