import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCarousel,
    MDBCarouselItem,} from "mdb-react-ui-kit";
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
import Slider from "react-slick";


const Games = () => {
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        autoplay:true ,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
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
        <MDBContainer fluid className="" id="games">
        
            <MDBTypography className="p-4 titlefontsize text-center text-warning fw-bold">
                Games
            </MDBTypography>

            <MDBRow>

            
                           
            <MDBCol className="col-12 col-lg-6"> 
                <div className="descriptionholder">
                <center>
                <div>
                <Slider {...settings} className="my-5 mx-5 text-center">
                    {contents.map((content)=> (
                    <div>
                    <MDBTypography className="h2 text-wrap mt-3">{content.name}</MDBTypography>

                    <MDBTypography className="text-wrap">
                    {content.description}
                    </MDBTypography>

                    <MDBTypography className="text-wrap">
                    {content.description}
                    </MDBTypography>
                    </div>
                    ))}
                                        
                    </Slider>
                </div>
                

                   <div className="subs">
                   <MDBTypography className="substext h2 text-wrap mt-lg-5">
                    Subscription:
                    </MDBTypography>
                    <br/>

                    <MDBRow className="">
                        <MDBCol className="mb-lg-0 mb-3">
                        <img src={pearl}  alt="..." className="badgesize"/>
                        <img src={ruby} alt="..." className="badgesize"/>
                        <img src={emerald}  alt="..." className="badgesize"/>
                        <img src={diamond}  alt="..." className="badgesize"/>
                        </MDBCol>
                    </MDBRow>
                   </div>     
                    
                </center>
                    
                    

                    

                    

                    
                    </div>
                    
            </MDBCol>
            

                <MDBCol>
                <div className="gamesmobileview">
                <MDBContainer className="characterholder">
                
                <MDBContainer fluid className="d-flex flex-column justify-content-center align-items-center mt-5">

                        <MDBCol className="mt-5 mb-3">
                        <MDBCarousel>
                        <MDBCarouselItem
                            className='d-block char w-60'
                            itemId={1}
                            src={woodcutting}
                            alt='...'
                        />
                        <MDBCarouselItem
                            className='d-block char w-60'
                            itemId={2}
                            src={crafting}
                            alt='...'
                        />
                        <MDBCarouselItem
                            className='d-block char w-60'
                            itemId={3}
                            src={fishing}
                            alt='...'
                        />
                        </MDBCarousel>
                        </MDBCol>
                    
                    
                    <MDBRow>
                        <MDBCol className="mt-5 p-5">
                        <img src={leftarrow} alt="..." className="arrowleft"/>
                        <img src={rightarrow} alt="..." className="arrowright"/>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                
                                    
                </MDBContainer>
                </div>                
                </MDBCol>

            </MDBRow>
        
        </MDBContainer>
        </div>
        
    )
}

export default Games;