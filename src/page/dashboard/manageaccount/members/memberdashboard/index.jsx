import React, { useState, } from 'react';
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { useParams, useSearchParams } from 'react-router-dom';
import MembersDashboard from './dashboard';
import MemberProfile from './profile';
import MemberWalletHistory from './wallethistory';
import MemberNetwork from './network';
import MemberInventory from './inventory';
import Task from './task';
import MemberPaymentdetails from './paymentdetails';
import MemberTransactionHistory from './transactionhistory';
import MemberGrindingHistory from './grindinghistory';
import BuyTokenHistory from './token/buyhistory';
import DepositTokenHistory from './token/deposithistory';
import WithdrawTokenHistory from './token/withdrawhistory';
const MembersProfile = () => {
    const [iconsActive, setIconsActive] = useState('pill1');
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username');
    const handleIconsClick = (value) => {
        if (value === iconsActive) {
        return;
        }

        setIconsActive(value);
    };


return (
    <>
    <MDBContainer>
        <MDBTabs pills className='mb-3'>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill1')} active={iconsActive === 'pill1'}>
            <MDBIcon fas icon='chart-pie' className='me-2' /> Dashboard
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill5')} active={iconsActive === 'pill5'}>
            <MDBIcon fas icon='cube' className='me-2' /> Inventory
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill2')} active={iconsActive === 'pill2'}>
            <MDBIcon fas icon='chart-line' className='me-2' /> Network
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill6')} active={iconsActive === 'pill6'}>
            <MDBIcon fas icon='tasks' className='me-2' /> Task
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill3')} active={iconsActive === 'pill3'}>
            <MDBIcon fas icon='cogs' className='me-2' /> Profile
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill7')} active={iconsActive === 'pill7'}>
            <MDBIcon fas icon='cogs' className='me-2' /> Payment Details
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill4')} active={iconsActive === 'pill4'}>
            
            <MDBIcon fas icon='history' className='me-2' /> Wallet History
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill8')} active={iconsActive === 'pill8'}>
            
            <MDBIcon fas icon='history' className='me-2' /> Transaction History
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill9')} active={iconsActive === 'pill9'}>
            
            <MDBIcon fas icon='history' className='me-2' /> Grinding History
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill10')} active={iconsActive === 'pill10'}>
            <MDBIcon fas icon='donate' className='me-2' /> Buy Token History
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill11')} active={iconsActive === 'pill11'}>
            <MDBIcon fas icon='arrow-alt-circle-down' className='me-2' /> Deposit Token History
            </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
            <MDBTabsLink onClick={() => handleIconsClick('pill12')} active={iconsActive === 'pill12'}>
            
            <MDBIcon fas icon='arrow-alt-circle-up' className='me-2' /> Withdraw Token History
            </MDBTabsLink>
        </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
        <MDBTabsPane show={iconsActive === 'pill1'}>
            <MembersDashboard username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill2'}>
            <MemberNetwork username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill3'}>
            <MemberProfile username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill4'}>
            <MemberWalletHistory username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill5'}>
            <MemberInventory username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill6'}>
            <Task username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill7'}>
            <MemberPaymentdetails username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill8'}>
            <MemberTransactionHistory username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill9'}>
            <MemberGrindingHistory username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill10'}>
            <BuyTokenHistory username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill11'}>
            <DepositTokenHistory username={username}/>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'pill12'}>
            <WithdrawTokenHistory username={username}/>
        </MDBTabsPane>
        </MDBTabsContent>
    </MDBContainer>
    
  </>
)
}

export default MembersProfile;