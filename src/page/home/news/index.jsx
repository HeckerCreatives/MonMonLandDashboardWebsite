import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCarousel, MDBCarouselItem,MDBCard,MDBCardBody,MDBCardImage,MDBCardText } from "mdb-react-ui-kit";
import "./index.css"
import woodcutting from "../../../assets/character/Wood Cutting.png"
import crafting from "../../../assets/character/crafting.png"
import fishing from "../../../assets/character/fishing.png"
import Slider from "react-slick";
const News = () => {
    const settings = {
        className: "center",
        arrows: false,
        dots: true,
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
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
        <MDBContainer fluid className="newsbgcolor" id="news">
            <MDBTypography className="p-5 titlefontsize text-warning text-center fw-bold">LATEST NEWS</MDBTypography>
        <div >        
        <Slider {...settings}>
          <div>
          <MDBCard className="cards">
                <MDBCardImage src={woodcutting} alt='...' position='top' id="images"/>
                <MDBCardBody>
                    <MDBCardText className="fw-bold text-center">
                    Mines are soon to Open
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
          </div>
          <div>
          <MDBCard className="cards">
                <MDBCardImage src={fishing} alt='...' position='top' id="images"/>
                <MDBCardBody>
                    <MDBCardText className="fw-bold text-center">
                    Mines are soon to Open
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
          </div>
          <div>
          <MDBCard className="cards">
                <MDBCardImage src={crafting} alt='...' position='top' id="images"/>
                <MDBCardBody>
                    <MDBCardText className="fw-bold text-center">
                    Mines are soon to Open
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
          </div>  
          <div>
          <MDBCard className="cards">
                <MDBCardImage src={fishing} alt='...' position='top' id="images"/>
                <MDBCardBody>
                    <MDBCardText className="fw-bold text-center">
                    Mines are soon to Open
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
          </div>
          
        </Slider>
        </div>    
        </MDBContainer>
    );
};

export default News;