import React, {useState} from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCol,
  MDBNavbarToggler
} from 'mdb-react-ui-kit';
import Sidebarnav from '../sidebarnav';
import { ThemeContext, themes } from '../theme/themecontext';





const Navbar = () => {
  const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  );
  const [darkMode, setDarkMode] = React.useState(true);
    return (
    // <MDBNavbar
    // expand='lg'
    // bgColor={darkMode}
    // // fixed='top'
    // >    
      <MDBContainer fluid>
        {window.innerWidth <= 768 && (        
        <MDBIcon
          fas
          icon="bars"
          size="2x"
          className="side-menu-toggle"
          role="button"
          onClick={() => setDidToggle(!didToggle)}
        />
        )}
        {window.innerWidth <= 768 && (        
          <Sidebarnav
          links={links}
          didToggle={didToggle}
          setDidToggle={setDidToggle}
        />
        )}
        {/* <Sidebarnav
          links={links}
          didToggle={didToggle}
          setDidToggle={setDidToggle}
        /> */}
        <div style={{float:"right"}}>
        <ThemeContext.Consumer>
            {({ changeTheme }) => (
              <MDBBtn
                color="link"
                onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                }}
              >
                <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                {/* <span className="d-lg-none d-md-block">Switch mode</span> */}
              </MDBBtn>
            )}
          </ThemeContext.Consumer>
        </div>  
      </MDBContainer>
    // </MDBNavbar>
    )
}

export default Navbar;