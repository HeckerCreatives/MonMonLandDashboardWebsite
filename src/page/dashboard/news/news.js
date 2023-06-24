import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { 
  MDBContainer, 
  MDBBtn, 
  MDBInput, 
  MDBRow, 
  MDBCol, 
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import './news.css'
import PaginationPager from "../../../component/pagination";
import CreateNews from "./modal/create";
import ViewNews from "./modal/view"
import UpdateNewsModal from "./modal/update"

const UpdateNews = () => {
    const [titles, setTitles] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [newsid, setNewsId] = useState('')
    const [news, setNews] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
    const [activeModal, setActiveModal] = useState(null);

    const handlePagination = (data, page, size) =>
    data.slice((page - 1) * size, size + (page - 1) * size);

    useEffect(() => {
      let totalPages = Math.floor(news.length / 5);
      if (news.length % 5 > 0) totalPages += 1;
      setTotal(totalPages);
      }, [news]);

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}news/find`)
      .then(result => result.json())
      .then(data => {
          setNews(data)
      })
    },[])

    const deleteitem = (id) => {
        Swal.fire({
        icon: "warning",
        title: `Are you sure to delete this?`,
        text: "You won't be able to revert this",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
        }).then(result1 => {
            if(result1.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}news/${id}/destroy`,{
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(result => result.json())
                .then(data => {
                    if(data){
                    window.location.reload()
                    }
                })
                
            }
        })        
    }

      
    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Landing Page News" paths={[]}/>
          <MDBRow className="p-2 d-flex">
          <MDBCol >
          <CreateNews />
          </MDBCol>
          </MDBRow>
          <MDBRow>
        <MDBCol>
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Title</th>
                    <th className="fw-bold" scope='col'>Image</th>
                    <th className="fw-bold" scope='col'>Description</th>
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                {news.map((balita, i) =>(
                <tr key={`balita-${i}`}>
                <td>{balita.title}</td>
                <td>
                    <img src={balita.image} alt="" style={{height:"50px", width:"50px"}}/>
                </td>                
                <td>{balita.description.length > 25 ? `${balita.description.substring(0,25)}...`: balita.description}</td>
                <td>{new Date(balita.createdAt).toLocaleString()}</td>
                <td>
                    <ViewNews news={balita}/>
                    <UpdateNewsModal news={balita}/>
                    <MDBBtn className="mx-2 fw-bold" type="button" outline color="dark" onClick={() => deleteitem(balita._id)}>Delete</MDBBtn>
                </td>
                </tr>
                ))}
                    
                </MDBTableBody>
                </MDBTable>
        </MDBCol>
        </MDBRow>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default UpdateNews;