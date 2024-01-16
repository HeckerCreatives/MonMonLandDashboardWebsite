import React, {useState, useEffect} from "react";
import { MDBContainer, MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isgamelogin } from "../../../../../component/utils";
import PlayerPaymentDetails from "./paymentdetails";
import PlayerChangePass from "./changepass";
import PlayerMyProfile from "./myprofile";
import "./profile.css"
const PlayerProfile = () => {
    const [user, setuser] = useState('');
    const [iconsActive, setIconsActive] = useState('pill1');

    const handleIconsClick = (value) => {
      if (value === iconsActive) {
        return;
      }
  
      setIconsActive(value);
    };

    useEffect(()=> {
      isgamelogin()
      .then(data => {
        setuser(data.name)
      })
    },[user])


    return (
        <MDBContainer >
        
        <MDBTabs pills className='mb-3'>
        <MDBTabsItem className="profile-nav-pills">
          <MDBTabsLink className="profile-nav-link" onClick={() => handleIconsClick('pill1')} active={iconsActive === 'pill1'}>
             My Profile
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="changepass-nav-pills">
          <MDBTabsLink className="changepass-nav-link" onClick={() => handleIconsClick('pill2')} active={iconsActive === 'pill2'}>
             Change Password
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className="pay-nav-pills">
          <MDBTabsLink className="pay-nav-link" onClick={() => handleIconsClick('pill3')} active={iconsActive === 'pill3'}>
             Payment Details
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={iconsActive === 'pill1'}>
          <PlayerMyProfile user={user}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill2'}>
          <PlayerChangePass/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill3'}>
          <PlayerPaymentDetails/>
        </MDBTabsPane>
      </MDBTabsContent>
        

        </MDBContainer>
        
    )
}

export default PlayerProfile;