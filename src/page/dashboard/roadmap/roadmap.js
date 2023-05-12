import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea, MDBTable,MDBTableBody,MDBTableHead,MDBTypography} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
const UpdateRoadmap = () => {
    const [titles, setTitles] = useState('');
    const [descriptions, setDescriptions] = useState('')
    const [rdlist, setRdList] = useState([]);
    const [roadid, setRoadId] = useState(''),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0);

    const handlePagination = (data, page, size) =>
    data.slice((page - 1) * size, size + (page - 1) * size);

    useEffect(() => {
        let totalPages = Math.floor(rdlist.length / 5);
        if (rdlist.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [rdlist]);

    

      useEffect(()=>{
        fetch(`http://localhost:4000/roadmap/find`)
        .then(result => result.json())
        .then(data => {
            setRdList(data)
        })
      },[])

      function add (e) {
        e.preventDefault();
        fetch(`http://localhost:4000/roadmap/addroadmap`, {
            method:'POST',
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
    const sortedRdList = [...rdlist].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Roadmap" paths={[]}/>
        
        <MDBRow className="align-items-center justify-content-center d-flex">
            <MDBCol  md={6} >
            <form onSubmit={e => add(e)}>
             <MDBCard className="">
              <MDBCardBody>
                <MDBInput label='Title' id='form1' type='text'  onChange={e => setTitles(e.target.value)} className="mb-3"/>

                <MDBTextArea label='Description' id='form1' rows={5}  onChange={e => setDescriptions(e.target.value)} className="mb-3"/>

                <MDBBtn type="submit">
                Add Roadmap
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
                    <th scope='col'>Title</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Date Created</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>

                {handlePagination(sortedRdList, page, 5)?.map(data =>(
                    <tr key={data._id}>
                    <td>
                        {data.title}
                    </td>
                    <td>
                        {data.description}
                    </td>                    
                    <td>
                    {new Date(data.createdAt).toLocaleString()}
                    </td>
                    </tr>
                ))}
                    
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