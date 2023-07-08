import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTypography,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,
} from "mdb-react-ui-kit";
import PaginationPager from "../../../../component/pagination";
import { handlePagination } from "../../../../component/utils";

const ViewCashier = ({ theme, id, checkedItems}) => {
  const [show, setShow] = useState(false);
  const [user, setuser] = useState('');
  const toggleShow = () => setShow(!show);
  const [history, setHistory] = useState("");
  const [page, setPage] = useState(1),
        [total, setTotal] = useState(0);

  useEffect(() => {
    let totalPages = Math.floor(history.length / 5);
    if (history.length % 5 > 0) totalPages += 1;
    setTotal(totalPages);
  }, [history]);

  useEffect(()=> {
    const fetchdata = async () => {
      if(!checkedItems){  
      await  fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
          .then(response => response.json())
          .then(result => {
                const data = result.filter(e => e.cashier ===  user.userId.userName)
                setHistory(data)          
          })}
    }
    fetchdata()
  },[user, checkedItems])
  
  useEffect(()=>{
    const fetchData = async () =>{
      if(!checkedItems){
      await fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findone/${id}`)
        .then(response => response.json())
        .then(result => {
          setuser(result)
        })
        } else {
          // 
        }
    }
    fetchData()
  },[checkedItems, id])
  return (
    <>
      <MDBBtn
        // outline
        onClick={toggleShow}
        className='mt-1 mx-2 fw-bold' 
        color='success'
        disabled={checkedItems}
      >
        {/* <MDBIcon fas icon="plus" /> */}
        View
      </MDBBtn>

      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <MDBModalHeader style={{background:"#A57552"}}>
              <MDBModalTitle className="text-light">
                View
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>              
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard className="px-0 mb-3" style={{background: "#EDCAB4",}}>
                <MDBCardBody
                >
                <MDBRow>
                   <MDBCol lg={6}>
                   <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Cashier :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" style={{width:'100%'}} defaultValue={user ? user.userId.userName : null} disabled></input>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Payment Method :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.paymentmethod} style={{width:'100%'}} disabled></input>
                   </MDBCol>

                   <MDBCol lg={6}>
                   <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Number of Transaction :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.numberoftransaction} style={{width:'100%'}} disabled></input> 
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Payment Detail:
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.paymentdetail} style={{width:'100%'}} disabled></input> 
                   </MDBCol>
                    <MDBCol lg={6}>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Payment Limit :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.paymentlimit} style={{width:'100%'}} disabled></input>
                    </MDBCol>
                    <MDBCol lg={6}>
                    <MDBCardText className="text-color mt-3 mb-0 fw-bold">
                    Status :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1" defaultValue={user.status} style={{width:'100%'}} disabled></input>
                    </MDBCol>
                      
                     
                
                </MDBRow>
                </MDBCardBody>              
              </MDBCard>
              <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Cashier Username</th>
                    <th className="fw-bold" scope='col'>Transaction Number</th>
                    <th className="fw-bold" scope='col'>Subscription Level</th>
                    <th className="fw-bold" scope='col'>Price</th>
                    <th className="fw-bold" scope='col'>Client Username</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">                
                {history ? 
                    <>
                {handlePagination(history, page, 5)?.map((data,i) =>(
                <tr key={`game-${i}`}>
                <td>{new Date(data.createdAt).toLocaleString()}</td>
                <td>
                    {data.cashier}
                </td>
                <td>
                    {data.transactionnumber}
                </td>
                <td>
                    {data.subscriptionlevel?.subscriptionName}
                </td>
                <td>
                    {`$${data.price}`}
                </td>
                <td>
                    {data.clientusername}
                </td>                
                </tr>
                ))}
                </>
                : null}                
                </MDBTableBody>
                </MDBTable>
                <PaginationPager
                  total={total} page={page} setPage={setPage}
                />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ViewCashier;
