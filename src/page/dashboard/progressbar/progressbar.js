import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
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
        <MDBContainer fluid className="d-flex justify-content-center align-items-center">
        <MDBRow className="my-4">
        <Link to = "/admin/dashboard">
        <MDBBtn>BACK</MDBBtn>
        </Link>
        <MDBCol>
        <form onSubmit={e => update(e)}>
        <MDBInput label='Initial Number' id='form1' type='number' value={initialnum} onChange={e => setInitialNum(e.target.value)}/>
        
        <MDBInput label='Total Number' id='form1' type='number' value={totalnum} onChange={e => setTotalNum(e.target.value)}/>

        <MDBBtn type="submit">
        Submit
        </MDBBtn>
        </form>
        
        </MDBCol>
        
        </MDBRow>        
        </MDBContainer>
    )
}

export default UpdateProgressBar;