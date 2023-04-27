import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol} from "mdb-react-ui-kit";
import Swal from "sweetalert2"

const UpdateRoadmap = () => {
    const [titles, setTitles] = useState('');
    const [descriptions, setDescriptions] = useState('')
    const [roadid, setRoadId] = useState('')

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
      
        if (selectedValue === 'Roadmap1') {
          setRoadId('6448c1661ced055c414d1bd9');
        } else if (selectedValue === 'Roadmap2') {
          setRoadId('6448c2531ced055c414d1bdc');
        } else if (selectedValue === 'Roadmap3') {
          setRoadId('6448c3461ced055c414d1bdf');
        } else if (selectedValue === 'Roadmap4') {
          setRoadId('6448c35e1ced055c414d1be1');
        }
      };

      function updatesub (e) {
        e.preventDefault();
        fetch(`http://localhost:4000/roadmap/${roadid}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titles,
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
            <Link to = "/">
                <MDBBtn>
                    BACK
                </MDBBtn>
            </Link>
            <select onChange={handleSelectChange}>
            <option value="Roadmap1">Roadmap 1</option>
            <option value="Roadmap2">Roadmap 2</option>
            <option value="Roadmap3">Roadmap 3</option>
            <option value="Roadmap4">Roadmap 4</option>
            </select>
            <MDBCol>
            <form onSubmit={e => updatesub(e)}>
                        
            <MDBInput label='Title' id='form1' type='text' value={titles} onChange={e => setTitles(e.target.value)}/>

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

export default UpdateRoadmap;