import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol} from "mdb-react-ui-kit";
import Swal from "sweetalert2"

const UpdateNews = () => {
    const [titles, setTitles] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [newsid, setNewsId] = useState('')

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
      
        if (selectedValue === 'Woodcutting') {
          setNewsId('6448b34e475b52b170636657');
        } else if (selectedValue === 'Mining') {
          setNewsId('6448b306475b52b170636651');
        } else if (selectedValue === 'Fishing') {
          setNewsId('6448b31a475b52b170636653');
        } else if (selectedValue === 'Crafting') {
          setNewsId('6448b32c475b52b170636655');
        }
      }; 

      function updatesub (e) {
        e.preventDefault();
        fetch(`http://localhost:4000/news/${newsid}/update`, {
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
        <Link to ="/admin/dashboard">
            <MDBBtn>
                BACK
            </MDBBtn>
        </Link>
        <select onChange={handleSelectChange}>
            <option value="Woodcutting">Woodcutting</option>
            <option value="Mining">Mining</option>
            <option value="Fishing">Fishing</option>
            <option value="Crafting">Crafting</option>
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

export default UpdateNews;