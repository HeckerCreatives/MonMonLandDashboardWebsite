import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea, MDBTable,MDBTableBody,MDBTableHead,MDBTypography} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
const UpdateRoadmap = () => {
    const [titles, setTitles] = useState('');
    const [descriptions, setDescriptions] = useState('')
    const [roadid, setRoadId] = useState(''),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0);
    useEffect(() => {
        let totalPages = Math.floor(roadid.length / 5);
        if (roadid.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [roadid]);

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

    //   useEffect(()=>{
    //     fetch(`http://localhost:4000/roadmap/${roadid}/find`)
    //     .then(result => result.json())
    //     .then(data => {
    //         setTitles(data.title)
    //         setDescriptions(data.description)
    //     })
    //   })

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
        <MDBContainer fluid className="">
        <Breadcrumb title="Roadmap" paths={[]}/>
        <MDBCol className="p-2 text-center">
                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value="Roadmap1"
                >
                Roadmap 1
                </MDBBtn>

                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value="Roadmap2">
                Roadmap 2
                </MDBBtn>

                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value="Roadmap3">
                Roadmap 3
                </MDBBtn>
                <MDBBtn 
                className="mx-2"
                onClick={handleSelectChange}
                value="Roadmap4">
                Roadmap 4
                </MDBBtn>
            </MDBCol>
        <MDBRow className="align-items-center justify-content-center d-flex">
            <MDBCol  md={6} >
            <form onSubmit={e => updatesub(e)}>
             <MDBCard className="">
              <MDBCardBody>
                <MDBInput label='Title' id='form1' type='text'  onChange={e => setTitles(e.target.value)} className="mb-3"/>

                <MDBTextArea label='Description' id='form1' rows={5}  onChange={e => setDescriptions(e.target.value)} className="mb-3"/>

                <MDBBtn type="submit">
                Submit
                </MDBBtn>
              </MDBCardBody>
             </MDBCard>           
            
            </form>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBTypography tag='h1' className="mt-4">Roadmap List</MDBTypography>
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
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default UpdateRoadmap;