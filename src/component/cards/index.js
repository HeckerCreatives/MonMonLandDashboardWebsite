import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBInput,
  MDBRow
} from "mdb-react-ui-kit"
import "./index.css"

const Cards = ({icon,texts,title, showviewbtn, url, style, cardstyle, textstyle}) => {
    return(
        <MDBCol          
        className="my-2 mt-md-2">
            <MDBCard className={``} style={cardstyle}>
                <MDBCardBody className="">                
                <MDBRow className="">
                <MDBCol className="">
                    <div className="d-flex justify-content-between">
                    <div style={style}>
                    <MDBIcon size="2x" icon={icon} color="white">
                    </MDBIcon>
                    </div>                        
                    { showviewbtn && <a href={url} className={``}>View All</a>} 
                    </div>
                    <MDBTypography tag="p">
                    {title}
                    </MDBTypography>
                    <MDBTypography tag="h5" style={textstyle}>
                    {texts}
                    </MDBTypography>
                </MDBCol>
                </MDBRow>
                    
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Cards;