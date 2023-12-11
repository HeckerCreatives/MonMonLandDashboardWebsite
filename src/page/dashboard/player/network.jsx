import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBBtn, 
    MDBRow, 
    MDBCol,
    MDBIcon, 
    MDBCard, 
    MDBCardBody,
    MDBTypography, 
    MDBCardText,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane } 
from "mdb-react-ui-kit";
import "./network.css"
const Network = () => {
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
    
        setBasicActive(value);
      };
    
return(
   <MDBContainer>
    <MDBTabs className='my-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            1 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            2 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            3 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={basicActive === 'tab4'}>
            4 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab5')} active={basicActive === 'tab5'}>
            5 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab6')} active={basicActive === 'tab6'}>
            6 level
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent >
        {basicActive === "tab1" && (
            <>
            <div className="d-flex justify-content-center">
            <div className="p-3 w-50 my-2 text-center bg-secondary rounded fw-bold text-light">
            Level 1 Total Commission:
            </div>
            </div>
            
            <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Commission</th>
                    </tr>
                </MDBTableHead>
                    <MDBTableBody className="fw-bold">
                        <tr>
                            <td>
                                Watch Ads Points
                            </td>
                            <td>
                                paerl
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                    </MDBTableBody>
            </MDBTable>
            </>
        )}
        {basicActive === "tab2" && (
            <>
            <div className="d-flex justify-content-center">
            <div className="p-3 w-50 my-2 text-center bg-secondary rounded fw-bold text-light">
            Level 2 Total Commission:
            </div>
            </div>
            
            <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Commission</th>
                    </tr>
                </MDBTableHead>
                    <MDBTableBody className="fw-bold">
                        <tr>
                            <td>
                                Watch Ads Points
                            </td>
                            <td>
                                emerald
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                    </MDBTableBody>
            </MDBTable>
            </>
        )}
        {basicActive === "tab3" && (
            <>
            <div className="d-flex justify-content-center">
            <div className="p-3 w-50 my-2 text-center bg-secondary rounded fw-bold text-light">
            Level 3 Total Commission:
            </div>
            </div> 
            
            <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Commission</th>
                    </tr>
                </MDBTableHead>
                    <MDBTableBody className="fw-bold">
                        <tr>
                            <td>
                                Watch Ads Points
                            </td>
                            <td>
                                ruby
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                    </MDBTableBody>
            </MDBTable>
            </>
        )}
        {basicActive === "tab4" && (
            <>
            <div className="d-flex justify-content-center">
            <div className="p-3 w-50 my-2 text-center bg-secondary rounded fw-bold text-light">
            Level 4 Total Commission:
            </div>
            </div> 
            
            <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Commission</th>
                    </tr>
                </MDBTableHead>
                    <MDBTableBody className="fw-bold">
                        <tr>
                            <td>
                                Watch Ads Points
                            </td>
                            <td>
                                ruby
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                    </MDBTableBody>
            </MDBTable>
            </>
        )}
        {basicActive === "tab5" && (
            <>
            <div className="d-flex justify-content-center">
            <div className="p-3 w-50 my-2 text-center bg-secondary rounded fw-bold text-light">
            Level 5 Total Commission:
            </div>
            </div> 
            
            <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Commission</th>
                    </tr>
                </MDBTableHead>
                    <MDBTableBody className="fw-bold">
                        <tr>
                            <td>
                                Watch Ads Points
                            </td>
                            <td>
                                ruby
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                    </MDBTableBody>
            </MDBTable>
            </>
        )}
        {basicActive === "tab6" && (
            <>
            <div className="d-flex justify-content-center">
            <div className="p-3 w-50 my-2 text-center bg-secondary rounded fw-bold text-light">
            Level 6 Total Commission:
            </div>
            </div> 
            
            <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Commission</th>
                    </tr>
                </MDBTableHead>
                    <MDBTableBody className="fw-bold">
                        <tr>
                            <td>
                                Watch Ads Points
                            </td>
                            <td>
                                ruby
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                    </MDBTableBody>
            </MDBTable>
            </>
        )}
      </MDBTabsContent>
   </MDBContainer>
)
}

export default Network;