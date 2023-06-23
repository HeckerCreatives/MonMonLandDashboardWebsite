import React, {useEffect, useRef, useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCarousel,
    MDBCarouselItem,
    MDBBtn,} from "mdb-react-ui-kit";
import "./index.css"
import leftarrow from "../../../assets/games/left arrow.png"
import rightarrow from "../../../assets/games/right arrow.png"
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
        arrows: false,
        dots: false,
        fade: true,
        infinite: true,
        // autoplay:true ,
        // autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // useTansform: true,
        // centerPadding: '100px',
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
        <MDBContainer fluid  id="games">
        
            <MDBTypography className="p-4 titlefontsize text-center text-warning fw-bold">
                Games
            </MDBTypography>

            <MDBRow className="">

            
           {/* Description holder */}
            <MDBCol className="col-12 col-xl-6 "> 
                <div className="descriptionholder">
                
                <div className="">
                    <Slider {...settings} className=' fw-bold' ref={sliderRef1}>
                    
                    {games.map((content)=> (
                    <div key={content._id} className="descdiv" >
                    
                    <MDBTypography className="h2 text-center mt-3" >{content.gametitle}</MDBTypography>

                    <MDBTypography className="p text-center" >
                    {content.description}
                    </MDBTypography>

                    <div className="subs">
                   <MDBCol className="">
                   <MDBTypography className="substext h2 text-wrap">
                    Subscription:
                    </MDBTypography>
                    <div className="d-flex align-items-center justify-content-center">
                    {content.selectsubscription.map((keyword) => (
                            <div key={`keyword-${id}`} className="badgeholder">
                            {keywordImages.hasOwnProperty(keyword) && (
                                <img
                                src={keywordImages[keyword]}
                                alt=""
                                className="img-fluid badgesize"
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
            <MDBCol className="col-12 col-xl-6">
            <div className="gamesmobileview">
            <div className="characterholder text-center">
            
            

                    <MDBCol className="">
                    <Slider {...settings} ref={sliderRef2}>
                    {games.map(game =>(
                        <div key={game._id} className="">
                        <img src={game.image} alt="" className="char"/>
                        </div>
                    ))}     
                    </Slider>
                    </MDBCol>
                
                
            <MDBBtn color="transparent" className="shadow-0 arrowleft">
            <img src={leftarrow} alt="..." className="arrowleft" onClick={gotoPrev}/>
            </MDBBtn>    
            <MDBBtn color="transparent" className="shadow-0 arrowright">
            <img src={rightarrow} alt="..." className="arrowright" onClick={gotoNext}/>
            </MDBBtn>
                            
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