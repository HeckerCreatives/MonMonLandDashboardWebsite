import React, {useEffect, useRef, useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCarousel,
    MDBCarouselItem,
    MDBBtn,} from "mdb-react-ui-kit";
import "./index.css"
import leftarrow from "../../../assets/games/left arrow.png"
import rightarrow from "../../../assets/games/right arrow.png"
import desc from "../../../assets/games/base.png"
import char from "../../../assets/games/character holder.png"
import pearl from "../../../assets/subscription/pearl badge.png"
import ruby from "../../../assets/subscription/ruby badge.png"
import emerald from "../../../assets/subscription/emerald.png"
import diamond from "../../../assets/subscription/diamond.png"
import pageon from "../../../assets/games/A.png"
import pageoff from "../../../assets/games/B.png"
import Slider from "react-slick";


const Games = () => {
    const [games, setGames] = useState([]);
    const [id, setId] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef1 = useRef();
    const sliderRef2 = useRef();

    const gotoNext = () => {
        sliderRef1.current.slickNext();
        sliderRef2.current.slickNext();
    }

    const gotoPrev = () => {
        sliderRef1.current.slickPrev();
        sliderRef2.current.slickPrev();
    }

    const settings = {
        className: "align-items-start",
        arrows: false,
        dots: window.innerWidth <= 1024 ? true: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: window.innerWidth <= 1024 ? (current) => {
            setCurrentSlide(current);
        } : false,
        swipe:window.innerWidth <= 1024 ? true: false,
        appendDots: window.innerWidth <= 1024 ? dots => (
            <div        
            >
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}> {dots} </ul>
            </div>
          ) : false,
          customPaging: window.innerWidth <= 1024 ? function(i) {
          const isActive = i === currentSlide;
          const imageSource = isActive ? pageon : pageoff;
            return (
              <a>
                <img src={imageSource} alt="" style={{height: "6px", width: "25px"}} className="rounded"/>
              </a>
            );
          } : false,
      };

      

      useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}games/find`,{
            credentials: 'include',
        })
          .then(response => response.json())
          .then(result => {       
            setGames(result)
            setId(result._id)
          });
      }, []);
      

    const keywordImages = {
        Diamond: diamond,
        Pearl: pearl,
        Ruby: ruby,
        Emerald: emerald
      };

    return(
        <div className="gamesbgcolor">
        <MDBContainer fluid  id="games" className="pt-5">
        
            <MDBTypography className="p-4 titlefontsize text-center text-warning fw-bold">
                Games
            </MDBTypography>

            <MDBRow className="align-items-center">

            
           {/* Description holder */}
            <MDBCol className="col-12 col-xxl-5 offset-xxl-1"> 
                <div className="descriptionholder">
                <div className="d-none d-xxl-block text-center">
                <img src={desc} alt="" className="holdersize"/>                       
                </div>
                <div className="descdiv">
                <div className="d-xxl-none d-block text-center">
                <img src={desc} alt="" className="d-xxl-none d-block descriptionholdermobile"/>                       
                </div>
                <Slider {...settings} className=' fw-bold' ref={sliderRef1}>
                
                {games.map((content)=> (
                <div key={content._id} className="" >
                
                <div className="mx-4">
                <MDBTypography className="h2 text-center" >{content.gametitle}</MDBTypography>
                </div>
                
                <div className="mx-3">
                <MDBTypography className="p m-0 px-3 px-xl-5 custom-text-size">
                {content.description.split('\n').map((paragraph, index) => (
                    <p className="pmargin" key={index}>{paragraph}</p>
                    ))}
                </MDBTypography>

                <div className="subsdiv">
                <MDBTypography className="h4 px-4 text-wrap">
                Subscription:
                </MDBTypography>
                <div className="d-flex align-items-center justify-content-center">
                {content.selectsubscription.map((keyword) => (
                        <div key={`keyword-${id}`} className="badgeholder">
                        {keywordImages.hasOwnProperty(keyword) && (
                            <img
                            src={keywordImages[keyword]}
                            alt=""
                            className="zoom-game badgesize"
                            />
                        )}
                        </div>
                    ))}
                </div>
                {/* <MDBCol className="mx-3 p-3">                
                </MDBCol> */}

                </div>
                
                </div>    
                

                

                </div>
                
                ))}
                                    
                </Slider>
                </div>
               
                
                </div>
                    
            </MDBCol>
            {/* End of Description holder */}

            {/* Character Holder */}
            <MDBCol className="col-12 col-xxl-5">
            <div className="gamesmobileview">
            <div className="characterholder text-center"> 
            <div>
                <img src={char} alt="" className="charholdersize"/>
            </div>

            <div className="chardiv">
            <Slider {...settings} ref={sliderRef2} >
            {games.map(game =>(
                <div key={game._id} className="d-flex justify-content-center">
                    <img src={`${process.env.REACT_APP_API_URL}${game.image}`} alt="" className="charsize"/>
                </div>
            ))}
                 
            </Slider>
            <MDBBtn color="transparent" className="shadow-0 arrowleft" onClick={gotoPrev}>
            <img src={leftarrow} alt="..." className="zoom-game arrowleft" />
            </MDBBtn>    
            <MDBBtn color="transparent" className="shadow-0 arrowright" onClick={gotoNext}>
            <img src={rightarrow} alt="..." className="zoom-game arrowright" />
            </MDBBtn>
            

            </div>
                            
            </div>
            
            </div>
            
                    
                          
            </MDBCol>
            {/* End of Character Holder */}
            </MDBRow> 
        </MDBContainer>
        </div>
        
    )
}

export default Games;