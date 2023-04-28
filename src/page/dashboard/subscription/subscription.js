import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol} from "mdb-react-ui-kit";
import Swal from "sweetalert2"

const UpdateSubs = () => {
    const [titles, setTitles] = useState('');
    const [amounts, setAmounts] = useState('');
    const [descriptions, setDescriptions] = useState('');
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

     
    function updatesub (e) {
        e.preventDefault();
        fetch(`http://localhost:4000/subscription/${badge}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titles,
                amount: amounts,
                description: descriptions
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
            <MDBRow>
                <Link to ="/admin/dashboard">
                    <MDBBtn>
                        BACK
                    </MDBBtn>
                </Link>
                <select onChange={handleSelectChange}>
                    <option value="Pearl">Pearl</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Diamond">Diamond</option>
                </select>
                <MDBCol>                

                    <form onSubmit={e => updatesub(e)}>
                    
                    <MDBInput label='Title' id='form1' type='text' value={titles} onChange={e => setTitles(e.target.value)}/>
        
                    <MDBInput label='Amount' id='form1' type='text' value={amounts} onChange={e => setAmounts(e.target.value)}/>

                    <MDBInput label='Description' id='form1' type='text' value={descriptions} onChange={e => setDescriptions(e.target.value)}/>

                    <MDBBtn type="submit">
                    Submit
                    </MDBBtn>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default UpdateSubs;