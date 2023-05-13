import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea, MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, MDBCardText} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import UpdateDescriptionModal from "./modal/editmodal";
import PaginationPager from '../../../component/pagination/index'

const UpdateSubs = () => {
    const [titles, setTitles] = useState('');
    const [gettitles, setGetTitles] = useState('');
    const [amounts, setAmounts] = useState('');
    const [getamounts, setGetAmounts] = useState('');
    const [descriptionlist, setDescriptionList] = useState([]);
    const [adddescriptions, setAddDescriptions] = useState('');
    const [badge, setBadge] = useState(''),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
    
    useEffect(() => {
        let totalPages = Math.floor(descriptionlist.length / 5);
        if (descriptionlist.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [descriptionlist]);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
      
        if (selectedValue === 'Pearl') {
          setBadge(process.env.REACT_APP_PEARL);
        } else if (selectedValue === 'Ruby') {
          setBadge(process.env.REACT_APP_RUBY);
        } else if (selectedValue === 'Emerald') {
          setBadge(process.env.REACT_APP_EMERALD);
        } else if (selectedValue === 'Diamond') {
          setBadge(process.env.REACT_APP_DIAMOND);
        }
        
      }; 

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/find`)
        .then(result => result.json())
        .then(data => {
            setGetTitles(data.subscriptionName)
            setGetAmounts(data.amount)
            // setAddDescriptions(data.description)
        })
    },[badge])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/finddesc`)
        .then(result => result.json())
        .then(data => {
            
            setDescriptionList(data)
        })
    },[badge])

    function updatesub (e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subscriptionName: titles,
                amount: amounts,                
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
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/addnewdesc`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: adddescriptions
            }) 
        }).then(result => result.json())
        .then(data => {
            console.log(data)
            if (data) {
				Swal.fire({
					title: "Add Successfully",
					icon: "success",
					text: "Successfully Added"
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
                className="mx-2 mt-2"
                onClick={handleSelectChange}
                value='Pearl'
                >
                Pearl
                </MDBBtn>

                <MDBBtn 
                className="mx-2 mt-2"
                onClick={handleSelectChange}
                value='Ruby'>
                Ruby
                </MDBBtn>

                <MDBBtn 
                className="mx-2 mt-2"
                onClick={handleSelectChange}
                value='Emerald'>
                Emerald
                </MDBBtn>
                <MDBBtn 
                className="mx-2 mt-2"
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
                    <MDBCard className="mt-3 h-100" alignment='end' >
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
                    <MDBCard className="mt-3" alignment='end'>
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
                <MDBTableBody className="">
                {gettitles ? 
                <>
                {descriptionlist.map(data =>(
                    <tr key={data._id}>                    
                        <td >
                        {data.description}
                        </td>                                   
                    <td>
                    {new Date(data.createdAt).toLocaleString()}
                    </td>                    
                    <td>
                    <UpdateDescriptionModal descriptionlist={data}/>
                    <MDBBtn color='link' rounded size='sm'>
                        Delete
                    </MDBBtn>
                    </td>
                    </tr>                    
                ))}
                </>
                : 
                <span>No Selected Subscription</span>
                }
                                    
                </MDBTableBody>
                </MDBTable>
            </MDBRow>
            <PaginationPager
            total={total} page={page} setPage={setPage}
          />
        </MDBContainer>
    )
}

export default UpdateSubs;