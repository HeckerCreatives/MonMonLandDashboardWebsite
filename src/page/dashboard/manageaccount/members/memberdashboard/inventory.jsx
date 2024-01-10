import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol } 
from "mdb-react-ui-kit";
import MemberTools from "./inventory/tools";
import MemberMerchandise from "./inventory/merchandise";
import MemberCosmetics from "./inventory/cosmetics";
import MemberSupplies from "./inventory/supplies";
const MemberInventory = ({username}) => {
    const [basicActive, setBasicActive] = useState('1');
    const [network1, setNetwork1] = useState([])
    const [network2, setNetwork2] = useState([])
    const [network3, setNetwork3] = useState([])
    const [network4, setNetwork4] = useState([])
    const [network5, setNetwork5] = useState([])
    const [network6, setNetwork6] = useState([])

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
    
        setBasicActive(value);
    };

return(
   <MDBContainer>
   <MDBRow>
        <MDBCol md={2}>
        <MDBTabs className='flex-md-column text-center'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('1')} active={basicActive === '1'}>
            Tools
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('2')} active={basicActive === '2'}>
           Merchandise
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('3')} active={basicActive === '3'}>
            Cosmetics
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('4')} active={basicActive === '4'}>
            Supplies
          </MDBTabsLink>
        </MDBTabsItem>
        
      </MDBTabs>
        </MDBCol>
        <MDBCol md={9}>
        <MDBTabsContent>
        <MDBTabsPane show={basicActive === '1'}>
            <MemberTools username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '2'}>
            <MemberMerchandise username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '3'}>
            <MemberCosmetics username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '4'}>
            <MemberSupplies username={username}/>
        </MDBTabsPane>
      </MDBTabsContent>
        </MDBCol>
    </MDBRow>
    

      
   </MDBContainer>
)
}

export default MemberInventory;