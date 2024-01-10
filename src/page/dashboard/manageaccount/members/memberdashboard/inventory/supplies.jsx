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
const MemberSupplies = ({username}) => {
    const [basicActive, setBasicActive] = useState('1');
    const [energy, setEnergy] = useState([])

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
    
        setBasicActive(value);
    };
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}members/getmembersupplies`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                type: 'energy'
            })
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setEnergy(data.data)
          }
        })
    },[])

return(
   <MDBContainer>
    <MDBTabs className=''>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('1')} active={basicActive === '1'}>
            Energy
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('2')} active={basicActive === '2'}>
           Essentials
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('3')} active={basicActive === '3'}>
           Etc
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === '1'}>
        <MDBTable small>
            <MDBTableHead>
              <tr className="text-center">
                <th scope='col'>Type</th>
                <th scope='col'>Owned</th>
                <th scope='col'>Consumables</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody className="text-center">
            { energy.length !== 0 ?
              energy?.map((item,i) => (
              <tr key={i}>
                <th scope='row'>
                {
                  item.name === '1' ? 'Energy 1' : item.name === '2' ? 'Energy 5' : item.name === '3' ? 'Eergy 10' : item.name === '4' ? 'Energy 20' : 'Energy 50'
                }
                </th>
                <td>{item.amount}</td>
                <td>{item.consumableamount}</td>
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

export default MemberSupplies;