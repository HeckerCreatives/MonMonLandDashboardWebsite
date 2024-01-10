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
    MDBTabsPane } 
from "mdb-react-ui-kit";
// import "./network.css"
import PlayerPerlevel from "./network/index";
const Network = () => {
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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}gameusers/findnetwork`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setNetwork1(data.data.find(item => item._id === 1))
            setNetwork2(data.data.find(item => item._id === 2))
            setNetwork3(data.data.find(item => item._id === 3))
            setNetwork4(data.data.find(item => item._id === 4))
            setNetwork5(data.data.find(item => item._id === 5))
            setNetwork6(data.data.find(item => item._id === 6))
          }
        })
    },[])
    
return(
   <MDBContainer>
    <MDBTabs className='my-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('1')} active={basicActive === '1'}>
            1 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('2')} active={basicActive === '2'}>
            2 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('3')} active={basicActive === '3'}>
            3 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('4')} active={basicActive === '4'}>
            4 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('5')} active={basicActive === '5'}>
            5 level
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('6')} active={basicActive === '6'}>
            6 level
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === '1'}>
            <PlayerPerlevel data={network1} level={'1'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '2'}>
            <PlayerPerlevel data={network2} level={'2'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '3'}>
            <PlayerPerlevel data={network3} level={'3'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '4'}>
            <PlayerPerlevel data={network4} level={'4'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '5'}>
            <PlayerPerlevel data={network5} level={'5'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '6'}>
            <PlayerPerlevel data={network6} level={'6'}/>
        </MDBTabsPane>
      </MDBTabsContent>
   </MDBContainer>
)
}

export default Network;