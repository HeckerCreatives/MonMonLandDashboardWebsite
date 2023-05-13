import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea, MDBCardImage, MDBCardText, MDBModal, MDBModalBody,MDBModalDialog,MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalFooter} from "mdb-react-ui-kit";
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

      // useEffect(()=>{
      //   fetch(`${process.env.REACT_APP_NEWS_URL}${newsid}/find`)
      //   .then(result => result.json())
      //   .then(data => {
      //       setTitles(data.title)
      //       setDescriptions(data.description)
      //   })
      // })

      
    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="News" paths={[]}/>
          <MDBRow className="p-2 d-flex">
          <MDBCol >
          <CreateNews />
          </MDBCol>
          </MDBRow>

        <MDBRow>
        {handlePagination(news, page, 5)?.map(balita => (
        <MDBCol>        
          <MDBCard key={balita._id} className="">
          <MDBCardImage src={balita.image} className="images"/>
          <MDBCardBody>
          <MDBCardText className="fw-bold">
          {balita.title}
          </MDBCardText>

          <MDBCardText className="fw-bold">
          {balita.description.length > 25 ? `${balita.description.substring(0,25)}...`: balita.description}
          </MDBCardText>
            
            <ViewNews news={balita}/>
            <UpdateNewsModal news={balita}/>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
        ))}
        </MDBRow>
        
          <PaginationPager
            total={total} page={page} setPage={setPage}
          />
        </MDBContainer>
    )
}

export default UpdateNews;