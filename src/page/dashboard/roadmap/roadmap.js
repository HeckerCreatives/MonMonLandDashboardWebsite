import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea, MDBTable,MDBTableBody,MDBTableHead,MDBTypography} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import ViewRoadmap from "./modal/view";
import UpdateRoadmapSlot from "./modal/edit";
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
        fetch(`${process.env.REACT_APP_API_URL}roadmap/find`)
        .then(result => result.json())
        .then(data => {
            setRdList(data)
        })
      },[])

      function add (e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}roadmap/addroadmap`, {
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

    const sortedList = rdlist.sort((a, b) => a._id.localeCompare(b._id));

    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Roadmap" paths={[]}/>
        <MDBRow>
            <MDBTypography tag='h3' className="fw-bold mt-4">Roadmap List</MDBTypography>
            <MDBTable align='middle' className="text-center border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr>
                    <th scope='col'>Slot</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Image</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Date Created</th>
                    <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>

                {handlePagination(sortedList, page, 5)?.map(data =>(
                    <tr key={data._id}>
                    <td>
                    {data._id === process.env.REACT_APP_ROADMAPSLOT1 ? 1 :
                    data._id === process.env.REACT_APP_ROADMAPSLOT2 ? 2 :
                    data._id === process.env.REACT_APP_ROADMAPSLOT3 ? 3 :
                    data._id === process.env.REACT_APP_ROADMAPSLOT4 ? 4 :
                    null}
                    </td>
                    
                    <td>
                        {data.title.length > 25 ? `${data.title.substring(0,25)}...`: data.title}
                    </td>
                    <td>
                    <img
                        src={data.image}
                        alt=""
                        style={{ height: "50px", width: "50px"}}
                    />
                    </td>
                    <td>
                        {data.description.length > 25 ? `${data.description.substring(0,25)}...`: data.description}
                    </td>                    
                    <td>
                    {new Date(data.createdAt).toLocaleString()}
                    </td>
                    <td>
                    <ViewRoadmap roadmap={data}/>
                    <UpdateRoadmapSlot roadmap={data}/>
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