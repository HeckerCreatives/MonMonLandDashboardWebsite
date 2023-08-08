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
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
import free from "../../../assets/subscription/Free icon.png"
import Slider from "react-slick";


const Games = () => {
    const [games, setGames] = useState([]);
    const [id, setId] = useState([]);
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
        // className: "hw90",
        arrows: false,
        dots: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // adaptiveHeight: true
      };

      useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}games/find`)
          .then(response => response.json())
          .then(result => {       
            setGames(result)
            setId(result._id)
          });
      }, []);
      

    const keywordImages = {
        Free: free,
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
            <MDBCol className="col-12 col-xl-5 offset-xl-1"> 
                <div className="descriptionholder">
                <div className="text-center">
                    <img src={desc} alt="" className="holdersize"/>                                
                </div>
                <div className="descdiv">
                <Slider {...settings} className=' fw-bold' ref={sliderRef1}>
                
                {games.map((content)=> (
                <div key={content._id} className="" >
                <div className="mx-4">
                <MDBTypography className="h2 text-center mt-3" >{content.gametitle}</MDBTypography>
                </div>
                
                <div className="mx-3">
                <MDBTypography className="p p-3 px-xl-5 custom-text-size">
                {content.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                    ))}
                </MDBTypography>
                </div>    
                

                <div className="">
                <MDBCol className="mx-3 p-3">
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
                            className="badgesize"
                            />
                        )}
                        </div>
                    ))}
                </div>
                </MDBCol>                    
                </div>

                </div>
                
                ))}
                                    
                </Slider>
                </div>
               
                
                </div>
                    
            </MDBCol>
            {/* End of Description holder */}

            {/* Character Holder */}
            <MDBCol className="col-12 col-xl-5">
            <div className="gamesmobileview">
            <div className="characterholder text-center"> 
            <div>
                <img src={char} alt="" className="charholdersize"/>
            </div>

            <div className="chardiv">
            <Slider {...settings} ref={sliderRef2} >
            {games.map(game =>(
                <div key={game._id} className="d-flex justify-content-center">
                    <img src={game.image} alt="" className="charsize"/>
                </div>
            ))}
                 
            </Slider>
            <MDBBtn color="transparent" className="shadow-0 arrowleft" onClick={gotoPrev}>
            <img src={leftarrow} alt="..." className="arrowleft" />
            </MDBBtn>    
            <MDBBtn color="transparent" className="shadow-0 arrowright" onClick={gotoNext}>
            <img src={rightarrow} alt="..." className="arrowright" />
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