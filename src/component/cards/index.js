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

const Cards = ({icon,texts,title, showviewbtn, url, iconstyle, cardstyle, textstyle, titlestyle,itemcol,cardclassname, image}) => {
    return(
        <MDBCol          
        className="my-2 mt-md-2">
            <MDBCard className={cardclassname} style={cardstyle}>
                <MDBCardBody className="">                
                <MDBRow className="">
                <MDBCol className={itemcol}>
                    <div className="d-flex justify-content-between">
                    <div style={iconstyle}>
                    {
                        icon &&
                    <MDBIcon className="img-fluid" size="2x" icon={icon} color="white">
                    </MDBIcon>
                    }
                    {
                        image && 
                        <img src={image} alt="" className="img-fluid"/>
                    }
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