import React, {useState, useEffect, useRef} from "react";
import { MDBContainer, MDBAccordion, MDBAccordionItem, MDBTypography,MDBCard,MDBCardBody,MDBCardImage,MDBCardText,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner, } from "mdb-react-ui-kit";
import "./index.css"
import Slider from "react-slick";
const News = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [newsdescription, setnewsDescription] = useState('');
  const [newstitle, setNewsTitle] = useState('');
  const [imahe, setImahe] = useState('');
  const toggleShow = () => setActiveModal(!activeModal)
  // const [currentPage, setCurrentPage] = useState(0);
  // const maxCharsPerPage = 669;

  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  // const displaycontent = newsdescription.substring(0,(currentPage + 1) * maxCharsPerPage);

  useEffect(()=>{
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}news/find`)
    .then(result => result.json())
    .then(data => {
        setNews(data)
        setIsLoading(false)
    })
  },[])
  
    const settings = {
        className: "center",
        arrows: false,
        centerMode: true,
        infinite: true,
        // centerPadding: "60px",
        slidesToShow: news.length >= 3 ? 3 : news.length,        
        adaptiveHeight: false,
        focusOnSelect: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 425,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
  

    return (
        <MDBContainer fluid className="pt-5 newsbgcolor" id="news">
        <div className=" titlefontsize text-warning text-center fw-bold text-wrap">
        <MDBTypography className="w-100">NEWS AND UPDATE</MDBTypography>
        </div>
            
        {isLoading ? <MDBSpinner color="warning"></MDBSpinner>
        :
        <div className="center">
        
        <Slider {...settings}>
        
        
          {news.map(balita =>(
          <div>
          <MDBCard className="mx-2" key={balita._id} alignment="center">
          <div className="d-flex justify-content-center">
          <MDBCardImage src={balita.image} alt='...' position='top' id="banner" />
          </div>
                
                <MDBCardBody>
                    <MDBCardText className="fw-bold text-center newstxtsize">
                    {balita?.title?.length > 70 ? `${balita?.title?.substring(0,70)}...`: balita?.title}
                    </MDBCardText>
                    <MDBCardText className="text-center newstxtsize">
                    {balita?.subtitle?.length > 60 ? `${balita?.subtitle?.substring(0,60)}...`: balita?.subtitle}
                    </MDBCardText>
                  <MDBBtn 
                  className="btn-warning zoom-news"
                  onClick={() => {
                  toggleShow()
                  setnewsDescription(balita.description)
                  setNewsTitle(balita.title)
                  setImahe(balita.image)
                  }}>
                  See More
                  </MDBBtn>  
                </MDBCardBody>
            </MDBCard>
            </div>
          ))}          
        </Slider>
        </div>
        } 
        <MDBModal staticBackdrop  show={activeModal} setShow={setActiveModal} tabIndex='-1' >
            <MDBModalDialog centered scrollable>
            <MDBModalContent>
                <MDBModalHeader className="seamless">
                <MDBModalTitle className="text-white" >{newstitle}</MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody>
                <MDBCard  className="d-flex justify-content-center bg-transparent">
                    <img alt="" src={imahe} id="bannermodal"/>
                </MDBCard>
                <MDBCardText className="text-dark mt-3 mb-0 fw-bold">Description</MDBCardText>
                <MDBCard  style={{background: "#EDCAB4",}}>
                
                    <MDBCardBody >
                    {newsdescription.split('\n').map((paragraph, index) => (
                      <p className="justify" key={index}>{paragraph}</p>
                    ))}

                    </MDBCardBody>                    
                </MDBCard>
                
                </MDBModalBody>
                <MDBModalFooter className="seamless">
                <MDBBtn className="btn-warning" type="button" onClick={toggleShow}>
                    Close
                </MDBBtn>                
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>    
        </MDBContainer>
    );
};

export default News;