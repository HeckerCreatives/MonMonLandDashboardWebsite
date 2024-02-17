import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane} 
from "mdb-react-ui-kit";
import PrizePool from "./prizepool";
import WinHistory from "./winhistory";
const MonmonBonanza = () => {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
return(
    <>
    <MDBContainer>
    <MDBTabs pills className='mb-3'>
        {/* <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Prize Pool
          </MDBTabsLink>
        </MDBTabsItem> */}
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Win History
          </MDBTabsLink>
        </MDBTabsItem>
        {/* <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Tab 3
          </MDBTabsLink>
        </MDBTabsItem> */}
      </MDBTabs>

      <MDBTabsContent>
        {/* <MDBTabsPane show={basicActive === 'tab1'}>
            <PrizePool/>
        </MDBTabsPane> */}
        <MDBTabsPane show={basicActive === 'tab1'}>
            <WinHistory/>
        </MDBTabsPane>
        {/* <MDBTabsPane show={basicActive === 'tab3'}>Tab 3 content</MDBTabsPane> */}
      </MDBTabsContent>
    </MDBContainer>
      </>
)
}

export default MonmonBonanza;