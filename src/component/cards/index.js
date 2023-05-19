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

const Cards = ({icon,texts,title, showviewbtn, url, iconstyle, cardstyle, textstyle, titlestyle,itemcol}) => {
    return(
        <MDBCol          
        className="my-2 mt-md-2">
            <MDBCard className={``} style={cardstyle}>
                <MDBCardBody className="">                
                <MDBRow className="">
                <MDBCol className={itemcol}>
                    <div className="d-flex justify-content-between">
                    <div style={iconstyle}>
                    <MDBIcon size="2x" icon={icon} color="white">
                    </MDBIcon>
                    </div>                        
                    { showviewbtn && <a href={url} className={``}>View All</a>} 
                    </div>
                    <MDBCol>
                    <MDBTypography style={titlestyle}>
                    {title}
                    </MDBTypography>
                    <MDBTypography style={textstyle}>
                    {texts}
                    </MDBTypography>
                    </MDBCol>
                    
                </MDBCol>
                </MDBRow>
                    
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Cards;