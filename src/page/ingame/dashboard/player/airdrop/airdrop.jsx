import { 
    MDBCard,
    MDBCardBody, 
    MDBCol, 
    MDBContainer, 
    MDBRow,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane } from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import mmticon from "../../../../../assets/Ingame/assetsdashboard/Monster Monies icon.png"
import mcticon from "../../../../../assets/Ingame/assetsdashboard/MML TOKEN.png"
import pearlicon from "../../../../../assets/subscription/pearl badge.png"
import rubyicon from "../../../../../assets/subscription/ruby badge.png"
import emeraldicon from "../../../../../assets/subscription/emerald.png"
import diamondicon from "../../../../../assets/subscription/diamond.png"
import AirDropTab from "./tab";
import AirDropTabRuby from "./rubytab";
import AirDropTabEmerald from "./emeraldtab";
import AirDropTabDiamond from "./diamondtab";
const AirDrop = () => {
    const [iconsActive, setIconsActive] = useState('pill1');
    const [usersub, setUserSub] = useState('');
    const handleIconsClick = (value) => {
      if (value === iconsActive) {
        return;
      }
  
      setIconsActive(value);
    };

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}playerdetails/mysubs`,{
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(result => result.json())
      .then(data => {
        if(data.message == "success"){
          setUserSub(data.data)
        }
      })
    },[])
    return(
        <MDBContainer>
        <MDBTabs pills className='my-5'>
        <MDBTabsItem className="profile-nav-pills">
          <MDBTabsLink className="profile-nav-link" onClick={() => handleIconsClick('pill1')} active={iconsActive === 'pill1'}>
             Pearl Plus
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="changepass-nav-pills">
          <MDBTabsLink className="changepass-nav-link" onClick={() => handleIconsClick('pill2')} active={iconsActive === 'pill2'}>
             Ruby
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="pay-nav-pills">
          <MDBTabsLink className="pay-nav-link" onClick={() => handleIconsClick('pill3')} active={iconsActive === 'pill3'}>
             Emerald
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="pay-nav-pills">
          <MDBTabsLink className="pay-nav-link" onClick={() => handleIconsClick('pill4')} active={iconsActive === 'pill4'}>
             Diamond
          </MDBTabsLink>
        </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={iconsActive === 'pill1'}>
            <AirDropTab usersubscription={usersub}/>
          </MDBTabsPane>
          <MDBTabsPane show={iconsActive === 'pill2'}>
            <AirDropTabRuby usersubscription={usersub}/>
          </MDBTabsPane>
          <MDBTabsPane show={iconsActive === 'pill3'}>
            <AirDropTabEmerald usersubscription={usersub}/>
          </MDBTabsPane>
          <MDBTabsPane show={iconsActive === 'pill4'}>
            <AirDropTabDiamond usersubscription={usersub}/>
          </MDBTabsPane>
        </MDBTabsContent>
        
        </MDBContainer>
    )
}

export default AirDrop;