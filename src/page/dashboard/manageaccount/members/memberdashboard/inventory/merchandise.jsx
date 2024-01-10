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
const MemberMerchandise = ({username}) => {
    const [basicActive, setBasicActive] = useState('1');
    const [clock, setClock] = useState([])

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
    
        setBasicActive(value);
    };
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}members/getmemberclock`,{
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
            setClock(data.data)
          }
        })
    },[])

return(
   <MDBContainer>
    <MDBTabs className=''>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('1')} active={basicActive === '1'}>
            Clock
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('2')} active={basicActive === '2'}>
           Lootbox
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('3')} active={basicActive === '3'}>
           House
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === '1'}>
        <MDBTable small>
            <MDBTableHead>
              <tr className="text-center">
                <th scope='col'>Clock</th>
                <th scope='col'>Owned</th>
                <th scope='col'>Expiration</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody className="text-center">
            { clock.length !== 0 ?
              clock?.map((item,i) => (
              <tr key={i}>
                <th scope='row'>
                {
                  item.type === '1' ? 'Basic' : item.type === '2' ? 'Intermidiate' : item.type === '3' ? 'Master' : 'Advance'
                }
                </th>
                <td>{item.isowned === "1" ? 'Yes' : 'No'}</td>
                <td>{item.expiration !== 0 ? new Date(item.expiration * 1000).toLocaleDateString(): 'No Expiration Date'}</td>
              </tr>
              ))
              
              :
              <tr>
                <td colSpan={3}>No Data</td>
              </tr>
            }
              
            </MDBTableBody>
          </MDBTable>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '2'}>
            
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === '3'}>
            
        </MDBTabsPane>
      </MDBTabsContent>
   </MDBContainer>
)
}

export default MemberMerchandise;