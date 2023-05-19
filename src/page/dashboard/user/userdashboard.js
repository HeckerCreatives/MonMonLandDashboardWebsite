import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, {useEffect} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import Cards from "../../../component/cards";
import { useNavigate } from "react-router-dom";



const UserDashboard = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const navigate = useNavigate()
    
    useEffect(() => {
        if (auth) {
          if (auth.roleId.display_name !== "Agent") {
            localStorage.removeItem("auth");
            navigate("/login");
          }
        }
      }, [auth, navigate]);

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