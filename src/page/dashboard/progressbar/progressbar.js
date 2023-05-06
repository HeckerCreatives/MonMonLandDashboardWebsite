import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBProgress, MDBProgressBar, MDBTypography, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
const UpdateProgressBar = () => {
    const [initialnum, setInitialNum] = useState("");
    const [totalnum, setTotalNum] = useState("");

    

    function update (e) {
        e.preventDefault();
        fetch('http://localhost:4000/gameactivity/6447681e5d356036c58392af/update', {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                initial: initialnum,
                total: totalnum
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
        <MDBContainer fluid className="">
        <Breadcrumb title="Progress Bar" paths={[]}/>
        <MDBRow className="my-4 align-items-center justify-content-center">
        
        <MDBCol md={6}>
        <form onSubmit={e => update(e)}>
        <MDBCard className="" alignment="center">
            <MDBCardBody>
                <MDBInput label='Initial Number' id='form1' type='number' value={initialnum} onChange={e => setInitialNum(e.target.value)} className="mb-3"/>
                
                <MDBInput label='Total Number' id='form1' type='number' value={totalnum} onChange={e => setTotalNum(e.target.value)} className="mb-3"/>

                <MDBBtn type="submit">
                Submit
                </MDBBtn>
            </MDBCardBody>
        </MDBCard>
        </form>
        
        </MDBCol>      

        </MDBRow>
        <MDBTypography tag={'h1'} className="text-center">
            0/0
        </MDBTypography>
        <MDBProgress height={25}>
            <MDBProgressBar width='30' valuemin={0} valuemax={100}/>
        </MDBProgress> 
        <MDBRow>
            <MDBTypography tag='h1' className="mt-4">Ads Income History</MDBTypography>
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
                        {/* {descriptionlist} */}
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

export default UpdateProgressBar;