import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane} 
from "mdb-react-ui-kit";
import FiestaGame from "./fiestagame";
const Fiesta = () => {
  const [basicActive, setBasicActive] = useState('tab1');
  const [palosebo, setPalosebo] = useState([]);
  const [supermonmon, setSupermonmon] = useState([]);
  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}members/fiesta`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            type: 'supermonmon'
        })
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setSupermonmon(data.data) 
      }
    })

    fetch(`${process.env.REACT_APP_API_URL}members/fiesta`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            type: 'palosebo'
        })
    })
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setPalosebo(data.data) 
      }
    })
          
  },[]) 

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
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Palosebo
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Supermonmon
          </MDBTabsLink>
        </MDBTabsItem>
        {/* <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Tab 3
          </MDBTabsLink>
        </MDBTabsItem> */}
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === 'tab1'}>
          <FiestaGame game={palosebo} prizepool={palosebo?.prizepools}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab2'}>
          <FiestaGame game={supermonmon} prizepool={supermonmon?.prizepools}/>
        </MDBTabsPane>
        {/* <MDBTabsPane show={basicActive === 'tab3'}>Tab 3 content</MDBTabsPane> */}
      </MDBTabsContent>
    </MDBContainer>
      </>
)
}

export default Fiesta;