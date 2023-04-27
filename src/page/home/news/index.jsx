import React, {useState, useEffect, useRef} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography,MDBCard,MDBCardBody,MDBCardImage,MDBCardText } from "mdb-react-ui-kit";
import "./index.css"
import woodcutting from "../../../assets/character/Wood Cutting.png"
import crafting from "../../../assets/character/crafting.png"
import fishing from "../../../assets/character/fishing.png"
import Slider from "react-slick";
const News = () => {
  const [news, setNews] = useState([]);
  

  useEffect(()=>{
    fetch('http://localhost:4000/news/find')
    .then(result => result.json())
    .then(data => {
        setNews(data)
        
    })
  },[])

    const settings = {
        className: "center",
        arrows: false,
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
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
        <MDBContainer fluid className="newsbgcolor" id="news">
            <MDBTypography className="p-5 titlefontsize text-warning text-center fw-bold">LATEST NEWS</MDBTypography>
        <div >        
        <Slider {...settings}>
          {news.map(balita =>(
          <div>
          <MDBCard className="cards" key={balita._id}>
                <MDBCardImage src={balita.image} alt='...' position='top' id="images"/>
                <MDBCardBody>
                    <MDBCardText className="fw-bold text-center">
                    {balita.title}
                    </MDBCardText>
                    <MDBCardText className="fw-bold text-center">
                    {balita.description}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </div>
          ))}
          

          {/* <div>
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
          </div> */}
          
        </Slider>
        </div>    
        </MDBContainer>
    );
};

export default News;