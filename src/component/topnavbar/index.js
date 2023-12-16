import React, { useState, useEffect } from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBIcon,
    MDBTypography,
    MDBRipple,
    MDBListGroup,
    MDBListGroupItem,
    MDBBtn
} from "mdb-react-ui-kit";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css"
import Swal from "sweetalert2";
import { ThemeContext, themes } from '../../component/theme/themecontext';
import ReferralButton from "../../component/dashboard/referral/referral";
import Cookies from 'js-cookie';
import { logout } from "../utils";
const TopNavbar = ({auth, didToggle, setDidToggle}) => {
    const [visibility, setVisibility] = useState(false),
    [word, setword] = useState(""),
    [word2, setword2] = useState(""),
    navigate = useNavigate();
    const location = useLocation();
    const [darkMode, setDarkMode] = React.useState(true);
    // const [didToggle, setDidToggle] = useState(
    //   window.innerWidth > 768 ? false : true
    // );

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const Word = pathParts[3];
    const Word2 = pathParts[4];
    const splitWords = Word
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (match) => match.toUpperCase());
    
    setword(splitWords);
    setword2(Word2);
  }, [location.pathname]);

    const handleLogout = () => {
      
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'See ya Later',
            showConfirmButton: false,
            timer: 5100
        })
        logout()
        // function deleteCookie(cookieName) {
        //   document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // }

        // deleteCookie("sessionToken");
        // deleteCookie("playfabAdminAuthToken");
        setVisibility(false);
        setTimeout(() => {

          // localStorage.removeItem("auth");
          // localStorage.removeItem("user");
        //   localStorage.removeItem("my-secret");
          window.location.href = "/login";
        }, 5100);
      };

    const items = [
        {
          name: "Change Password",
          icon: "user",
        //   path: `${auth?.roleId.name}/profile`,
        },
        {
            name: "Change Email",
            icon: "user",
          //   path: `${auth?.roleId.name}/profile`,
        },
        {
          name: "Payment Details",
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
        <>
          
      <MDBContainer
      fluid
      className="topnavbg p-0 d-flex align-items-end"
      >        

      <MDBRow className="topnavbgcolor m-0">
        
      <MDBCol className="text d-flex justify-content-between align-items-center">
      {window.innerWidth <= 768 ? <div className="me-2">
          {window.innerWidth <= 768 && (
          <MDBIcon
            fas
            icon="bars"
            className="side-menu-toggle"
            role="button"
            onClick={() => setDidToggle(!didToggle)}
          />
        )}
      </div>: null}
      
      { window.innerWidth > 375 ? 
      <div>
      
      {/* <MDBTypography className="m-0">
       
      </MDBTypography> */}
      {word} {word2 ? `> ${word2.charAt(0).toUpperCase() + word2.slice(1)}`: "" }
      </div>
      :
      null  
      }
      <div className="d-flex">
      {/* <ReferralButton auth={auth} /> */}
          {/* <ThemeContext.Consumer>
            {({ changeTheme }) => (
              <MDBBtn
                color="link"
                size="sm"
                onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                }}
                // style={{ float: 'right' }}
              >
                <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </MDBBtn>
            )}
          </ThemeContext.Consumer>       */}
      <div className="dropdown">
      
        <MDBCol className="dropdown text d-lg-flex justify-content-end align-items-center panel-zoom" onClick={() => setVisibility(!visibility)}>
          <MDBIcon fas icon="user-circle" size="lg" />
          <div className="d-lg-block d-none">
          &nbsp;{auth}
          </div>
          {/* &nbsp;<MDBIcon fas icon="angle-down" size="lg" /> */}
        </MDBCol>
        <div className={`custom-dropdown-content ${visibility ? 'd-block' : 'd-none'}`}>
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

            <MDBRipple rippleTag="span">
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
      </div>
    </MDBCol>
        </MDBRow>
        </MDBContainer>
        </>
        
    )
}

export default TopNavbar;