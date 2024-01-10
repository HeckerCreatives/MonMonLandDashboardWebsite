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
const MemberCosmetics = ({username}) => {
    const [basicActive, setBasicActive] = useState('1');
    const [ring, setRing] = useState([])

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
    
        setBasicActive(value);
    };
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}members/getmembercosmetics`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                type: 'ring'
            })
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setRing(data.data)
          }
        })
    },[])

return(
   <MDBContainer>
    <MDBTabs className=''>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('1')} active={basicActive === '1'}>
            Ring
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('2')} active={basicActive === '2'}>
           Necklace
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('3')} active={basicActive === '3'}>
           Earrings
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === '1'}>
        <MDBTable small>
            <MDBTableHead>
              <tr className="text-center">
                <th scope='col'>Ring</th>
                <th scope='col'>Ownership type</th>
                <th scope='col'>Expiration</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody className="text-center">
            { ring.length !== 0 ?
              ring?.map((item,i) => (
              <tr key={i}>
                <th scope='row'>
                {
                  item.name
                }
                </th>
                <td>{item.permanent}</td>
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

export default MemberCosmetics;