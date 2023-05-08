import React, {useRef} from "react";
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
import woodcutting from "../../../assets/character/Wood Cutting.png"
import crafting from "../../../assets/character/crafting.png"
import fishing from "../../../assets/character/fishing.png"
import fletching from "../../../assets/character/fletching.png"
import harvesting from "../../../assets/character/harvesting.png"
import hunting from "../../../assets/character/hunting.png"
import mining from "../../../assets/character/mining.png"
import Slider from "react-slick";


const Games = () => {
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

    const contents = [
        {
            name: "Wood Cutting",
            description: "Lorem ipsum is a Latin phrase that is often used as a placeholder text in the design and typesetting industry."
        },
        {
            name: "Crafting",
            description: "Lorem ipsum is a Latin phrase that is often used as a placeholder text in the design and typesetting industry."
        },
        {
            name: "Fishing",
            description: "Lorem ipsum is a Latin phrase that is often used as a placeholder text in the design and typesetting industry."
        },
        {
            name: "Fletching",
            description: "Lorem ipsum is a Latin phrase that is often used as a placeholder text in the design and typesetting industry."
        },
        {
            name: "Harvesting",
            description: "Lorem ipsum is a Latin phrase that is often used as a placeholder text in the design and typesetting industry."
        },
        {
            name: "Hunting",
            description: "Lorem ipsum is a Latin phrase that is often used as a placeholder text in the design and typesetting industry."
        },
        {
            name: "Mining",
            description: "Lorem ipsum is a Latin phrase that is often used as a placeholder text in the design and typesetting industry."
        },
    ]  
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
                    <Slider {...settings} className='text-center fw-bold' ref={sliderRef1}>
                    
                    {contents.map((content)=> (
                    <div className="descdiv" >
                    <MDBTypography className="h2  mt-3" >{content.name}</MDBTypography>

                    <MDBTypography className="p" >
                    {content.description}
                    </MDBTypography>

                    <MDBTypography className="p" >
                    {content.description}
                    </MDBTypography>
                    </div>
                    ))}
                                       
                                        
                    </Slider>
                </div>
                

                   <div className="subs">
                   <MDBCol className="">
                   <MDBTypography className="substext h2 text-wrap">
                    Subscription:
                    </MDBTypography>
                                    
                    <img src={pearl}  alt="..." className="img-fluid badgesize"/>
                    <img src={ruby} alt="..." className="img-fluid badgesize"/>
                    <img src={emerald}  alt="..." className="img-fluid badgesize"/>
                    <img src={diamond}  alt="..." className="img-fluid badgesize"/>
                    </MDBCol>
                    
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
                    
                    <div className="">
                    <img src={woodcutting} alt="" className="char"/>
                    </div>
                    <div className="">
                    <img src={crafting} alt="" className="char"/>
                    </div>
                    <div className="">
                    <img src={fishing} alt="" className="char"/>
                    </div>

                    <div className="">
                    <img src={fletching} alt="" className="char"/>
                    </div>
                    <div className="">
                    <img src={harvesting} alt="" className="char"/>
                    </div>
                    <div className="">
                    <img src={hunting} alt="" className="char"/>
                    </div>
                    <div className="">
                    <img src={mining} alt="" className="char"/>
                    </div>
                                   
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