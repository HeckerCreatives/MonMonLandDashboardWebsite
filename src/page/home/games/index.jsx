import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography,} from "mdb-react-ui-kit";
import "./index.css"
import leftarrow from "../../../assets/games/left arrow.png"
import rightarrow from "../../../assets/games/right arrow.png"
import pearl from "../../../assets/subscription/pearl badge.png"
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
import woodcutting from "../../../assets/character/Wood Cutting.png"



const Games = () => {
    return(
        <div className="gamesbgcolor">
        <MDBContainer fluid className="" id="games">
        
            <MDBTypography className="h2 text-center text-warning fw-bold">
                Games
            </MDBTypography>
            <MDBRow>

                <MDBCol>
                <MDBContainer className="d-flex flex-column descriptionholder px-5">

                <MDBCol className="d-flex flex-column justify-content-center align-items-center">

                <MDBTypography className="h2 text-center text-wrap mt-3" style={{width: "50%"}}>Wood Cutting</MDBTypography>

                <MDBTypography className="text-wrap text-center" style={{width: "50%"}}>
                "Lorem ipsum" is a Latin phrase that is often used as a placeholder text in the design and typesetting industry. It is commonly used to demonstrate the visual effects of different typefaces, layouts, and designs without distracting the reader with meaningful content.
                </MDBTypography>

                <MDBTypography className="text-wrap text-center" style={{width: "50%"}}>
                "Lorem ipsum" is a Latin phrase that is often used as a placeholder text in the design and typesetting industry. It is commonly used to demonstrate the visual effects of different typefaces, layouts, and designs without distracting the reader with meaningful content.
                </MDBTypography>

                <MDBTypography className="h2 text-wrap " style={{width: "50%"}}>
                    Subscription:
                </MDBTypography>

                <MDBRow>
                    <MDBCol className="pb-4">
                    <img src={pearl} id="pearlbadgesize" alt="..."/>
                    <img src={ruby} id="rubybadgesize" alt="..."/>
                    <img src={emerald} id="emeraldbadgesize" alt="..."/>
                    <img src={diamond} id="diamondbadgesize" alt="..."/>
                    </MDBCol>
                </MDBRow>

                </MDBCol>
                
                </MDBContainer>
                </MDBCol>

                <MDBCol>
                <MDBContainer className="d-flex flex-column characterholder">
                
                <MDBContainer fluid className="d-flex flex-column justify-content-center align-items-center mt-5">

                        <MDBCol className="mt-5 mb-3">
                        <img src={woodcutting} alt="..." className="char"/>
                        </MDBCol>
                    
                    
                    <MDBRow>
                        <MDBCol className="mt-5">
                        <img src={leftarrow} alt="..." className="arrowleft"/>
                        <img src={rightarrow} alt="..." className="arrowright"/>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                
                                    
                </MDBContainer>
                
                </MDBCol>
            </MDBRow>
        
        </MDBContainer>
        </div>
        
    )
}

export default Games;