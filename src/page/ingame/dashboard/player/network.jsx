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
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol } 
from "mdb-react-ui-kit";
import "./dash.css"
import PlayerPerlevel from "./network/index";
import image from "../../../../assets/Ingame/assetsnetwork/total commission icon.png"

const Network = () => {
    const [basicActive, setBasicActive] = useState('1');
    const [network1, setNetwork1] = useState([])
    const [network2, setNetwork2] = useState([])
    const [network3, setNetwork3] = useState([])
    const [network4, setNetwork4] = useState([])
    const [network5, setNetwork5] = useState([])
    const [network6, setNetwork6] = useState([])
    const [commission, setCommission] = useState(0)
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

        fetch(`${process.env.REACT_APP_API_URL}gamewallet/totalcommission`,{
          credentials: 'include',
      })
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          setCommission(data.data.totalAmount)
        }
      })
    },[])
    
return(
   <MDBContainer>
   <MDBCard className="mt-5" shadow="5">
    <MDBRow>
      <MDBCol lg={4} className="m-lg-3">
      <MDBCard className="bg-commi p-0">          
          <MDBCardBody>
            <MDBRow className="justify-content-between align-items-center">
              <MDBCol lg={3} className="text-center">
              <img src={image} alt=""/>
              </MDBCol>
              <MDBCol className="my-2 p-0">
              <div>
                <p className="text-end">Total Commission</p>
                <h4 className="m-0 p-0 text-end">
                  {commission?.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                  })}
                </h4>
              </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
      </MDBCard>
      </MDBCol>
    </MDBRow>
   

    <MDBCardBody>
    <MDBTabs pills  className=''>
        <MDBTabsItem className="network-nav-pills">
          <MDBTabsLink className="network-nav-link"  onClick={() => handleBasicClick('1')} active={basicActive === '1'}>
            Level 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="network-nav-pills">
          <MDBTabsLink className="network-nav-link" onClick={() => handleBasicClick('2')} active={basicActive === '2'}>
            Level 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem  className="network-nav-pills">
          <MDBTabsLink className="network-nav-link" onClick={() => handleBasicClick('3')} active={basicActive === '3'}>
            Level 3
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="network-nav-pills">
          <MDBTabsLink className="network-nav-link" onClick={() => handleBasicClick('4')} active={basicActive === '4'}>
            Level 4
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="network-nav-pills">
          <MDBTabsLink className="network-nav-link" onClick={() => handleBasicClick('5')} active={basicActive === '5'}>
            Level 5
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="network-nav-pills">
          <MDBTabsLink className="network-nav-link" onClick={() => handleBasicClick('6')} active={basicActive === '6'}>
           Level 6
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
    </MDBCardBody>
   </MDBCard>
    
   </MDBContainer>
)
}

export default Network;