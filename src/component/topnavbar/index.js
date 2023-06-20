import React, { useState, useEffect } from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBIcon,
    MDBTypography,
    MDBRipple,
    MDBListGroup,
    MDBListGroupItem
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./index.css"
import Swal from "sweetalert2";
const TopNavbar = ({auth}) => {
    const [visibility, setVisibility] = useState(false),
    navigate = useNavigate();

    const handleLogout = () => {
      
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'See ya Later',
            showConfirmButton: false,
            timer: 5100
        })
  
        setVisibility(false);
        setTimeout(() => {
          localStorage.removeItem("auth");
        //   localStorage.removeItem("my-secret");
          window.location.href = "/login";
        }, 5100);
      };

    const items = [
        {
          name: "My Profile",
          icon: "user",
        //   path: `${auth?.roleId.name}/profile`,
        },
        {
            name: "Change Password",
            icon: "user",
          //   path: `${auth?.roleId.name}/profile`,
        },
      ];

    //   const handleEvent = e => e.target.id !== "My Profile" && setVisibility(false);

    //   useEffect(() => {
    //     window.addEventListener("click", handleEvent);
    //     return () => window.removeEventListener("click", handleEvent);
    //   }, []);

    return (
        <MDBContainer
        fluid
        className="topnavbg d-flex align-items-end p-0"
        >        
        <MDBRow className="topnavbgcolor m-0">
        <MDBCol className="text d-flex justify-content-between align-items-center">
        Manage Account
        <div className="dropdown">
        <MDBCol className="dropdown text d-flex justify-content-end align-items-center" onClick={() => setVisibility(!visibility)}>        
        <MDBIcon fas icon="user-circle" size="lg"/>
        &nbsp;{auth.userName}
        &nbsp;<MDBIcon fas icon="angle-down" size="lg"/>
        </MDBCol>
        <div
          className={`custom-dropdown-content  ${
            visibility ? "d-block" : "d-none"
          }`}
        >
          <MDBListGroup>
            {items.map((item, index) => (
              <MDBRipple
                key={`profile-item-${index}`}
                rippleTag="span"
                // rippleColor={theme.border}
              >
                <MDBListGroupItem
                  onClick={() => {
                    setVisibility(!visibility);
                    navigate(item.path);
                  }}
                  className={`bg-transparent  border-0 cursor-pointer`}
                >
                  <MDBIcon icon={item.icon} />
                  &nbsp;
                  {item.name}
                </MDBListGroupItem>
              </MDBRipple>
            ))}

            <MDBRipple rippleTag="span" >
              <MDBListGroupItem
                onClick={handleLogout}
                className={`bg-transparent text-danger border-0 cursor-pointer`}
              >
                <MDBIcon icon="sign-out-alt" />
                &nbsp;Logout
              </MDBListGroupItem>
            </MDBRipple>
          </MDBListGroup>
        </div>
        </div>        
        </MDBCol>
        </MDBRow>
        
        

        </MDBContainer>
    )
}

export default TopNavbar;