import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea, MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, MDBCardText} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
const UpdateSubs = () => {
    const [titles, setTitles] = useState('');
    const [gettitles, setGetTitles] = useState('');
    const [amounts, setAmounts] = useState('');
    const [getamounts, setGetAmounts] = useState('');
    const [descriptionlist, setDescriptionList] = useState('');
    const [adddescriptions, setAddDescriptions] = useState('');
    const [badge, setBadge] = useState('');
    

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
      
        if (selectedValue === 'Pearl') {
          setBadge('6447873aaec1f03c8226297e');
        } else if (selectedValue === 'Ruby') {
          setBadge('6448807a475b52b1706365c4');
        } else if (selectedValue === 'Emerald') {
          setBadge('6448821a475b52b1706365cb');
        } else if (selectedValue === 'Diamond') {
          setBadge('64488270475b52b1706365d1');
        }
        
      }; 

    useEffect(()=>{
        fetch(`http://localhost:4000/subscription/${badge}/find`)
        .then(result => result.json())
        .then(data => {
            setGetTitles(data.title)
            setGetAmounts(data.amount)
            setDescriptionList(data.descriptions)
        })
    })

    function updatesub (e) {
        e.preventDefault();
        fetch(`http://localhost:4000/subscription/${badge}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titles,
                amount: amounts
            })            
        }).then(result => result.json())
        .then(data => {

            if (data) {
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				})
				
			} else {
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
        }) 
    }

    function adddescription (e) {
        e.preventDefault();
        fetch(`http://localhost:4000/subscription/${badge}/update`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descriptions:[{
                    description: adddescriptions
                }] 
            }) 
        }).then(result => result.json())
        .then(data => {
            if (data) {
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				})
				
			} else {
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
        })
    }

    return (
        <MDBContainer fluid>
            <Breadcrumb title="Subscription" paths={[]}/>
            <MDBCol className="p-2">
                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value='Pearl'
                >
                Pearl
                </MDBBtn>

                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value='Ruby'>
                Ruby
                </MDBBtn>

                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value='Emerald'>
                Emerald
                </MDBBtn>
                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value='Diamond'>
                Diamond
                </MDBBtn>
            </MDBCol>    
                
            <MDBCard className="my-2">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol>                            
                            <MDBCardText className="fw-bold">{`Subscription Name: ${gettitles ? gettitles: 'Please Select'}`}</MDBCardText>                      
                        </MDBCol>
                        <MDBCol>                            
                            <MDBCardText className="fw-bold">{`Amount: ${getamounts ? getamounts : "Please Select"}`}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>            
            </MDBCard>

            
            <MDBRow>
            
                <MDBCol md={6}>
                <form onSubmit={e => updatesub(e)}>
                    <MDBCard className="h-100" alignment='end'>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol className="mb-3">
                                <MDBInput label={`Subscription Name:`}   type="text" className="mb-3" onChange={e => setTitles(e.target.value)}/>                        
                            
                                <MDBInput label={`Amount:`} type="text" className="mb-3" onChange={e => setAmounts(e.target.value)}/>
                            </MDBCol>
                            
                        </MDBRow>

                            <MDBBtn type="submit">update</MDBBtn>
                           
                    </MDBCardBody>            
                    </MDBCard>
                    </form>
                </MDBCol>
                
                
                <MDBCol md={6}>
                <form onSubmit={e => adddescription(e)}>
                    <MDBCard className="h-100" alignment='end'>
                        <MDBCardBody>
                            <MDBTextArea label={`Description`}  rows={10} className="mb-3"      onChange={e => setAddDescriptions(e.target.value)}/>
                            <MDBBtn type="submit">Add</MDBBtn>
                        </MDBCardBody>            
                    </MDBCard>
                </form>
                </MDBCol>
                
            </MDBRow>
            

            <MDBRow>
            <MDBTypography tag='h1' className="mt-4">Description List</MDBTypography>
            <MDBTable align='middle' className="border mt-4">
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Description</th>
                    <th scope='col'>Date Created</th>
                    <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                    <td>
                        {descriptionlist}
                    </td>
                    <td>
                        kunyare date
                    </td>                    
                    <td>
                        <MDBBtn color='link' rounded size='sm'>
                        Edit
                        </MDBBtn>
                        <MDBBtn color='link' rounded size='sm'>
                        Delete
                        </MDBBtn>
                    </td>
                    </tr>
                </MDBTableBody>
                </MDBTable>
            </MDBRow>
            
        </MDBContainer>
    )
}

export default UpdateSubs;