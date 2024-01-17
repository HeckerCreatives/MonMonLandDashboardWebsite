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
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCardText,
    MDBSpinner } from "mdb-react-ui-kit";
  import React, {useState, useEffect} from "react";
  import Breadcrumb from "../../../../component/breadcrumb";
  import Cards from "../../../../component/cards";
  import PaginationPager from "../../../../component/pagination";
  import Swal from "sweetalert2";
  import { handlePagination } from "../../../../component/utils"
  import Cookies from 'js-cookie';
  const BannedMembers = () => {
    const [bannedlist, setBannedList] = useState([]),
          [checkedItems, setCheckedItems] = useState([]),
          [bannedcount, setBannedCount] = useState([]),
          [reason, setReason] = useState(''),
          [page, setPage] = useState(1),
          [total, setTotal] = useState(0);
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);   

    useEffect(() => {
          let totalPages = Math.floor(bannedlist.length / 5);
          if (bannedlist.length % 5 > 0) totalPages += 1;
          setTotal(totalPages);
    }, [bannedlist]);
  
    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}members/bannedmembers`,{
        credentials: 'include',
      })
      .then(result => result.json())
      .then(data => {
        console.log(data)
        setBannedList(data.data)
      })

      fetch(`${process.env.REACT_APP_API_URL}members/bannedcount`,{
        credentials: 'include',
      })
      .then(result => result.json())
      .then(data => {
        
        setBannedCount(data.data)
      })
    },[])
  
    const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
        // Item is already checked, remove it from the array
        setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
        // Item is not checked, add it to the array
        setCheckedItems([...checkedItems, itemId]);
    }
    };
  
    const deleteitem = async (username) => {
        Swal.fire({
            icon: "warning",
            title: `Are you sure to unban ${username}?`,
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Unban",
            denyButtonText: "Cancel",
            }).then(result1 => {
                if(result1.isConfirmed){
                    fetch(`${process.env.REACT_APP_API_URL}members/unbanmember`,{
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                        })
                    }).then(result => result.json())
                    .then(data => {
                        if(data.expired){
                        Swal.fire({
                            icon: "error",
                            title: data.expired,
                            text: "You Will Redirect to Login",
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then(ok => {
                            if(ok.isConfirmed){
                            Cookies.remove("auth", { path: '/' });;
                            Cookies.remove("playfabAdminAuthToken", { path: '/' });
                            window.location.replace("/login");
                            }
                        })
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: 'Success',
                                text: `You successfully unban ${username}`,
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            }).then(() => {
                                window.location.reload()
                            })
                        }
                    })
                    
                }
            })
                
    }
  
    const deleteItems = async () => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure to unban users?",
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Unban",
            denyButtonText: "Cancel",
        }).then((result1) => {
            if (result1.isConfirmed) {
            // Delete multiple items by sending the array of IDs
            fetch(`${process.env.REACT_APP_API_URL}members/unbanmultiplemember`, {
                method: "POST",
                credentials: 'include',
                headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${auth?.token}`,
                },
                body: JSON.stringify({
                    usernames: checkedItems,
                }),
            })
                .then((result) => result.json())
                .then((data) => {
                if(data.expired){
                    Swal.fire({
                    icon: "error",
                    title: data.expired,
                    text: "You Will Redirect to Login",
                    allowOutsideClick: false,
                    allowEscapeKey: false
                    }).then(ok => {
                    if(ok.isConfirmed){
                        Cookies.remove("auth", { path: '/' });;
                        Cookies.remove("playfabAdminAuthToken", { path: '/' });
                        window.location.replace("/login");
                    }
                    })
                } else {
                    Swal.fire({
                        icon: "success",
                        title: 'Success',
                        text: `Unban Successfully`,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then(() => {
                        window.location.reload()
                    })
                }
                });
            }
        });
    };

      return(
        <>
          
          <MDBContainer fluid>
          
          <MDBRow>
          <MDBCol>
          
          <Breadcrumb title="Banned List"/>
          </MDBCol>      
          </MDBRow>
          <MDBRow>
          <MDBCol md={6}>
          <Cards 
          title={bannedcount.totalbanned} 
          texts="Total Banned" 
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
          title={bannedcount.todaybanned} 
          texts="Todays Banned" 
          icon="user-friends" 
          cardclassname={'shadow-3'}
          iconstyle={{background: "#556EE6", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}  
          titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
          />
          </MDBCol>
          </MDBRow>   
          <MDBBtn className="mt-1 mx-2 fw-bold" 
          type="button" 
          color="danger"
          onClick={deleteItems}
          disabled={checkedItems.length === 0}
          >Unban</MDBBtn>
          <MDBTable align='middle' className="border mt-4" responsive>
                  <MDBTableHead className="head text-center">
                      <tr >
                      <th className="fw-bold" scope='col'>Select</th>
                      <th className="fw-bold" scope='col'>Date Banned</th>
                      <th className="fw-bold" scope='col'>Username</th>
                      <th className="fw-bold" scope='col'>Action</th>
                      </tr>
                  </MDBTableHead>
                  <MDBTableBody className="text-center">
                  {bannedlist ?
                    <>
                  {handlePagination(bannedlist, page, 5)?.map((acc, i) =>(
                  <tr key={`acc-${i}`}>
                  <td>
                    <input type="checkbox"
                    checked={checkedItems.includes(acc.username)}
                    onChange={() => handleCheckboxChange(acc.username)} 
                    ></input>
                  </td>
                  <td>{new Date(acc.bandate).toLocaleString()}</td>
                  <td>
                  {acc.username}
                  </td>                               
                  <td>
                      <MDBBtn 
                      onClick={() => {
                        setReason(acc.banreason)
                        toggleOpen()                        
                      }}
                      >
                      View
                      </MDBBtn>
                      <MDBBtn className="mx-2 fw-bold" type="button" outline color="dark" onClick={() => deleteitem(acc.username)}>Unban</MDBBtn>
                  </td>
                  </tr>
                  ))}
                  </> 
                   :
                   <tr>
                    <td>
                    <span>No Data</span>
                    </td>
                   </tr> }
                     
                  </MDBTableBody>
                  </MDBTable>
          <PaginationPager
              total={total} page={page} setPage={setPage}
          />
          </MDBContainer>
          <MDBModal show={basicModal} tabIndex='-1'>
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle>Reason for Banning</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                    </MDBModalHeader>

                    <MDBModalBody>
                      {reason}
                    </MDBModalBody>

                    <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleOpen}>
                        Close
                    </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
          </>
      )
  }
  
  export default BannedMembers;