import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn
} from 'mdb-react-ui-kit';

const Navbar = () => {
  
    return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarNav className='d-flex flex-row'>
          <MDBNavbarItem className='ms-auto me-lg-0'>
          <MDBBtn
          size='sm'
          color='transparent'
          className='shadow-0'
          >
          <MDBIcon 
          fas 
          icon={"sun"}
          className='p-1'
          />
          <MDBIcon 
          fas 
          icon={"moon"}
          />
          </MDBBtn>
          </MDBNavbarItem>
         
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
    )
}

export default Navbar;