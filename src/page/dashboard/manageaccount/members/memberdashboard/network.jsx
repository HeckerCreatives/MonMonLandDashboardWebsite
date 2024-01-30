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
import Perlevel from "./networklevel/perlevel";
const MemberNetwork = ({username}) => {
    const [basicActive, setBasicActive] = useState('1');
    const [network1, setNetwork1] = useState([])
    const [network2, setNetwork2] = useState([])
    const [network3, setNetwork3] = useState([])
    const [network4, setNetwork4] = useState([])
    const [network5, setNetwork5] = useState([])
    const [network6, setNetwork6] = useState([])
    const [network7, setNetwork7] = useState([])
    const [network8, setNetwork8] = useState([])
    const [network9, setNetwork9] = useState([])
    const [network10, setNetwork10] = useState([])
    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
    
        setBasicActive(value);
    };
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}members/findnetwork`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            })
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
            setNetwork7(data.data.find(item => item._id === 7))
            setNetwork8(data.data.find(item => item._id === 8))
            setNetwork9(data.data.find(item => item._id === 9))
            setNetwork10(data.data.find(item => item._id === 10))
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
        <MDBTabsItem >
          <MDBTabsLink  onClick={() => handleBasicClick('7')} active={basicActive === '7'}>
           Level 7
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem >
          <MDBTabsLink  onClick={() => handleBasicClick('8')} active={basicActive === '8'}>
           Level 8
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem >
          <MDBTabsLink  onClick={() => handleBasicClick('9')} active={basicActive === '9'}>
           Level 9
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem >
          <MDBTabsLink  onClick={() => handleBasicClick('10')} active={basicActive === '10'}>
           Level 10
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === '1'}>
            <Perlevel data={network1} level={'1'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '2'}>
            <Perlevel data={network2} level={'2'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '3'}>
            <Perlevel data={network3} level={'3'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '4'}>
            <Perlevel data={network4} level={'4'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '5'}>
            <Perlevel data={network5} level={'5'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '6'}>
            <Perlevel data={network6} level={'6'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '7'}>
            <Perlevel data={network7} level={'7'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '8'}>
            <Perlevel data={network8} level={'8'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '9'}>
            <Perlevel data={network9} level={'9'}/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '10'}>
            <Perlevel data={network10} level={'10'}/>
        </MDBTabsPane>
      </MDBTabsContent>
   </MDBContainer>
)
}

export default MemberNetwork;