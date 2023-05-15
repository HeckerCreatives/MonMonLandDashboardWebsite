import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import Breadcrumb from "../../../component/breadcrumb";
import Cards from "../../../component/cards";



const UserDashboard = () => {
    return(
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow>
        <Cards
            color='primary'
            icon='hotel'
            title='Players'
            texts='Madami hehe'
        />
        <Cards
            color='primary'
            icon='hotel'
            title='Players'
            texts='Madami hehe'
        />
        <Cards
            color='primary'
            icon='hotel'
            title='Players'
            texts='Madami hehe'
        />
        <Cards
            color='primary'
            icon='hotel'
            title='Players'
            texts='Madami hehe'
        />
        <Cards
            color='primary'
            icon='hotel'
            title='Players'
            texts='Madami hehe'
        />
        <Cards
            color='primary'
            icon='hotel'
            title='Players'
            texts='Madami hehe'
        />
        </MDBRow>
        
        </MDBContainer>
    )
}

export default UserDashboard;