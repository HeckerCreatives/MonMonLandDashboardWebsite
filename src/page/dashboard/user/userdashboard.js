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
            textstyle={{color: "white"}}
            titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#035AA6"}}
            iconstyle={{background: "#1D6BAF", padding: "10px", borderRadius: "5px"}}
            icon='users'
            title='Total Players'
            texts='0'
        />
        <Cards
            textstyle={{color: "white"}}
            titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#0779E4"}}
            iconstyle={{background: "#2087E7", padding: "10px", borderRadius: "5px"}}
            icon='user'
            title='Active Players'
            texts='0'
        />
        <Cards
            textstyle={{color: "white"}}
            titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#10375C"}}
            iconstyle={{background: "#284B6D", padding: "10px", borderRadius: "5px"}}
            icon='user-alt-slash'
            title='Inactive Players'
            texts='0'
        />
        <Cards
            textstyle={{color: "white"}}
                titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
                cardstyle={{background: "#4F8A8B"}}
                iconstyle={{background: "#619697", padding: "10px", borderRadius: "5px"}}
            icon='wallet'
            title='Paid Players'
            texts='0'
        />
        <Cards
            textstyle={{color: "white"}}
            titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#0779E4"}}
            iconstyle={{background: "#2087E7", padding: "10px", borderRadius: "5px"}}
            icon='wallet'
            title='Withdrawals'
            texts='0'
        />
        <Cards
            textstyle={{color: "white"}}
            titlestyle={{color: "white", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#10375C"}}
            iconstyle={{background: "#284B6D", padding: "10px", borderRadius: "5px"}}
            icon='exchange'
            title='Transaction'
            texts='0'
        />
        </MDBRow>
        
        </MDBContainer>
    )
}

export default UserDashboard;