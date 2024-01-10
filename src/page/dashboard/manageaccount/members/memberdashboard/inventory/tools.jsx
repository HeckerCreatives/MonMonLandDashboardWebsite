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
const MemberTools = ({username}) => {
    const [basicActive, setBasicActive] = useState('1');
    const [tools, setTools] = useState([])

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
    
        setBasicActive(value);
    };
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}members/getmembertools`,{
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
            setTools(data.data)
          }
        })
    },[])

return(
   <MDBContainer>
    <MDBTabs className=''>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('1')} active={basicActive === '1'}>
            Grinding
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('2')} active={basicActive === '2'}>
           Combat
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('3')} active={basicActive === '3'}>
           Treasure
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === '1'}>
        <MDBTable small>
            <MDBTableHead>
              <tr className="text-center">
                <th scope='col'>Tool</th>
                <th scope='col'>Owned</th>
                <th scope='col'>Expiration</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody className="text-center">
            { tools.length !== 0 ?
              tools?.map((item,i) => (
              <tr key={i}>
                <th scope='row'>
                {
                  item.type === '1' ? 'Bronze' : item.type === '2' ? 'Iron' : item.type === '3' ? 'Steel' : item.type === '4' ? 'Mithril' : 'Adamant'
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

export default MemberTools;