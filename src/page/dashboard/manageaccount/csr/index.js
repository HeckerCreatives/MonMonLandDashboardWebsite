import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, 
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText, } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Breadcrumb from "../../../../component/breadcrumb";
import FullTable from "../../../../component/fulltablelist";
import { Link } from "react-router-dom";
// import ManageDashboard from "../../../component/dashboard/admin/manageplayer/managedashboard"
import Cards from "../../../../component/cards";
import "./index.css"
import PaginationPager from "../../../../component/pagination";

const CreateCSRAccount = () => {
  const [txthead, setTxtHead] = useState([]),
        [txttable, setTxtTable] = useState([]);
        const [centredModal, setCentredModal] = useState(false);
        const toggleShow = () => setCentredModal(!centredModal),
        [page, setPage] = useState(1),
        [total, setTotal] = useState(0);
    
    useEffect(() => {
        let totalPages = Math.floor(txttable.length / 5);
        if (txttable.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [txttable]);

useEffect(()=>{
setTxtHead(
[
  {
    title:'Select'
  },
  {
    title:'Date Created'
  },
  {
    title:'Username'
  },
  {
    title:'Password'
  },
  {
    title:'Email'
  },
  {
    title:'Phone'
  },
  {
    title:'Action'
  },

]
)

// fetch(`${process.env.REACT_APP_API_URL}manage/activeuser`)
// .then(result => result.json())
// .then(data => {
//   setTxtTable(data)
// })


},[])


    return(
      <>
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol>
        <Breadcrumb title="CSR List"/>
        </MDBCol>        
        <MDBCol md={3} className="">
            <MDBInput type="search"                
            label="Search">
            </MDBInput>        
        {/* <MDBIcon fas icon="search" /> */}        
        </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol md={6}>
        <Cards 
        title="0" 
        texts="Total Joinings" 
        icon="user-plus"
        cardstyle={{padding: "0px",}} 
        iconstyle={{background: "#34C38F", padding: "8px", borderRadius: "5px"}}
        itemcol={`d-flex align-items-center gap-3`}
        cardclassname={'shadow-3'}
        titlestyle={{ marginTop:"0px",marginBottom:"0px"}}    
        />
        </MDBCol>
        <MDBCol md={6}>
        <Cards 
        title="0" 
        texts="Todays Joinings" 
        icon="user-friends" 
        cardclassname={'shadow-3'}
        iconstyle={{background: "#556EE6", padding: "8px", borderRadius: "5px"}}
        itemcol={`d-flex align-items-center gap-3`}  
        titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
        />
        </MDBCol>
        </MDBRow>     
        <FullTable 
        txtHeader={txthead} 
        txtTable={txttable} 
        button={true} 
        btn1text="Create CSR Account" 
        btn2text="Delete Selected"
        btn1onclick={toggleShow}
        />
        
        <PaginationPager
            total={total} page={page} setPage={setPage}
        />
        </MDBContainer>

        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader style={{background:"#A57552"}}>
              <MDBModalTitle className="text-light">Create an CSR Account</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBCardText className="text-dark mb-0 fw-bold">
                Account Information
            </MDBCardText>
            <MDBCard style={{background: "#EDCAB4",}}>
              <MDBCardBody>
              <MDBCardText className="text-color mb-0 fw-bold" >
                Username:
              </MDBCardText>
              <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
                Password:
              </MDBCardText>
              <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
                Confirm Password:
              </MDBCardText>
              <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              </MDBCardBody>
            </MDBCard>
            <MDBCardText className="mt-5 text-dark mb-0 fw-bold">
                Basic Information
            </MDBCardText>
            <MDBCard style={{background: "#EDCAB4"}}>
              <MDBCardBody>
              <MDBCardText className="text-color mb-0 fw-bold">
                Email:
              </MDBCardText>
              <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
               Phone:
              </MDBCardText>
              <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              </MDBCardBody>
            </MDBCard>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Cancel
              </MDBBtn>
              <MDBBtn>Create Account</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    )
}

export default CreateCSRAccount;