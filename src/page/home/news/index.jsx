import React, {useState, useEffect, useRef} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography,MDBCard,MDBCardBody,MDBCardImage,MDBCardText,
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
  const [activeModal, setActiveModal] = useState(null);
  const [newsdescription, setnewsDescription] = useState('');
  const [newstitle, setNewsTitle] = useState('');
  const [imahe, setImahe] = useState('');

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
        centerPadding: "60px",
        slidesToShow: news.length >= 3 ? 3 : news.length,
        speed: 500,
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
        <MDBContainer fluid className="newsbgcolor text-center" id="news">
            <MDBTypography className="p-5 titlefontsize text-warning text-center fw-bold">NEWS AND INFORMATION</MDBTypography>
        {isLoading ? <MDBSpinner color="warning"></MDBSpinner>
        :
        <div className="center">
        
        <Slider {...settings}>
        
        
          {news.map(balita =>(
          <div>
          <MDBCard className="cards" key={balita._id} alignment="center">
                <MDBCardImage src={balita.image} alt='...' position='top' id="images" />
                <MDBCardBody>
                    <MDBCardText className="fw-bold text-center">
                    {balita.title}
                    </MDBCardText>
                    <MDBCardText className="text-center">
                    {balita.description.length > 25 ? `${balita.description.substring(0,25)}...`: balita.description}
                    </MDBCardText>
                  <MDBBtn onClick={() => {
                  setActiveModal(true)
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
        <MDBModal  show={activeModal} onClick={()=> setActiveModal(null)} tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">{newstitle}</MDBModalTitle>
                {/* <MDBBtn className='btn-close' color='none' onClick={()=> setActiveModal(null)}></MDBBtn> */}
                </MDBModalHeader>
                <MDBModalBody>
                <MDBCard  className="d-flex justify-content-center seamless" >
                    <MDBCardBody>
                    <img alt="" src={imahe}/>
                    </MDBCardBody>                    
                </MDBCard>
                <MDBCardText className="text-dark mt-3 mb-0 fw-bold">Description</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                    <MDBCardBody >
                    {newsdescription}
                    </MDBCardBody>                    
                </MDBCard>
                
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color='secondary' type="button" onClick={()=> setActiveModal(null)}>
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