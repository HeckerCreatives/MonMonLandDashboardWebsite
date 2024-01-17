import { 
    MDBBtn, 
    MDBCol, 
    MDBContainer, 
    MDBIcon, 
    MDBInput, 
    MDBRow,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCardText,
    MDBSpinner, 
    MDBInputGroup} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Breadcrumb from "../../../../component/breadcrumb";
import FullTable from "../../../../component/fulltablelist";
import Cards from "../../../../component/cards";
import PaginationPager from "../../../../component/pagination";
import Swal from "sweetalert2";
import { handlePagination } from "../../../../component/utils"
import Cookies from 'js-cookie';
import MembersProfile from "./memberdashboard";
const MembersAccount = () => {
    const [confirmpass, setConfirmPass] = useState(""),
        [member, setMember] = useState([]),
        [checkedItems, setCheckedItems] = useState([]),
        [joined, setJoined] = useState([]),
        [page, setPage] = useState(1),
        [isloading, setIsLoading] = useState(false),
        [total, setTotal] = useState(0);
      
    useEffect(() => {
          let totalPages = Math.floor(member.length / 10);
          if (member.length % 10 > 0) totalPages += 1;
          setTotal(totalPages);
    }, [member]);
  
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}members/find`,{
        credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
        setMember(data.data)
        })

        fetch(`${process.env.REACT_APP_API_URL}members/joined`,{
        credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
        setJoined(data.data)
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
        const { value: message } = await Swal.fire({
            title: "Enter your reason for banning this user",
            input: "textarea",
            inputLabel: "Reason for Banning",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            }
          });
          if (message) {
            Swal.fire({
                icon: "warning",
                title: `Are you sure to do this?`,
                text: "You won't be able to revert this",
                showDenyButton: true,
                confirmButtonText: "Ban",
                denyButtonText: "Cancel",
                }).then(result1 => {
                    if(result1.isConfirmed){
                        fetch(`${process.env.REACT_APP_API_URL}members/banmember`,{
                            method: "POST",
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: username,
                                reason: message
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
                            } else if(data.message === "success") {
                                Swal.fire({
                                    icon: "success",
                                    title: 'Success',
                                    text: `You successfully ban ${username}`,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                }).then(() => {
                                    window.location.reload()
                                })
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: data.message,
                                    text: data.error,
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
                
    }
  
    const deleteItems = async () => {
        const { value: message } = await Swal.fire({
            title: "Enter your reason for banning users",
            input: "textarea",
            inputLabel: "Reason for Banning",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                return "You need to write something!";
                }
            }
        });
        if(message){
            Swal.fire({
                icon: "warning",
                title: "Are you sure to delete these items?",
                text: "You won't be able to revert this",
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: "Cancel",
            }).then((result1) => {
                if (result1.isConfirmed) {
                // Delete multiple items by sending the array of IDs
                fetch(`${process.env.REACT_APP_API_URL}members/banmultiplemember`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${auth?.token}`,
                    },
                    body: JSON.stringify({
                        usernames: checkedItems,
                        reason: message
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
                            text: `Ban Successfully`,
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then(() => {
                            window.location.reload()
                        })
                    }
                    });
                }
            });
        }
   
    };

    const searchusername = (e) => {
        e.preventDefault();
        const { username } = e.target
        fetch(`${process.env.REACT_APP_API_URL}members/searchusername`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username.value
            })
        })
        .then(result => result.json())
        .then(data => {
            console.log(data)
            setMember(data.data)
        })
    }

    const searchemail = (e) => {
        e.preventDefault();
        const { email } = e.target
        fetch(`${process.env.REACT_APP_API_URL}members/searchemail`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email.value
            })
        })
        .then(result => result.json())
        .then(data => {
            setMember(data.data)
        })
    }

      return(
        <>
          
          <MDBContainer fluid>
          
          <MDBRow>
          <MDBCol>
          
          <Breadcrumb title="Members List"/>
          </MDBCol>        
          {/* <MDBCol md={3} className="">
              <MDBInput type="search"                
              label="Search">
              </MDBInput>        
          <MDBIcon fas icon="search" />        
          </MDBCol> */}
          </MDBRow>
          <MDBRow>
            <MDBCol md={2}>
            <Cards 
            title={joined.totaljoin}
            texts="Total Joinings" 
            icon="user-plus"
            cardstyle={{padding: "0px",}} 
            iconstyle={{background: "#34C38F", padding: "8px", borderRadius: "5px"}}
            itemcol={`d-flex align-items-center gap-3`}
            cardclassname={'shadow-3'}
            titlestyle={{ marginTop:"0px",marginBottom:"0px"}}    
            />
            </MDBCol>
            <MDBCol md={2}>
            <Cards 
            title={joined.todayjoin} 
            texts="Today Joinings" 
            icon="user-friends" 
            cardclassname={'shadow-3'}
            iconstyle={{background: "#556EE6", padding: "8px", borderRadius: "5px"}}
            itemcol={`d-flex align-items-center gap-3`}  
            titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
            />
            </MDBCol>
            <MDBCol md={2}>
          <Cards 
          title={joined.pearl}
          texts="Pearl" 
          icon="user-plus"
          cardstyle={{padding: "0px",}} 
          iconstyle={{background: "#34C38F", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}
          cardclassname={'shadow-3'}
          titlestyle={{ marginTop:"0px",marginBottom:"0px"}}    
          />
          </MDBCol>
          <MDBCol md={2}>
          <Cards 
          title={joined.ruby} 
          texts="Ruby" 
          icon="user-friends" 
          cardclassname={'shadow-3'}
          iconstyle={{background: "#556EE6", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}  
          titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
          />
          </MDBCol>
          <MDBCol md={2}>
          <Cards 
          title={joined.emerald}
          texts="Emerald" 
          icon="user-plus"
          cardstyle={{padding: "0px",}} 
          iconstyle={{background: "#34C38F", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}
          cardclassname={'shadow-3'}
          titlestyle={{ marginTop:"0px",marginBottom:"0px"}}    
          />
          </MDBCol>
          <MDBCol md={2}>
          <Cards 
          title={joined.diamond} 
          texts="Diamond" 
          icon="user-friends" 
          cardclassname={'shadow-3'}
          iconstyle={{background: "#556EE6", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}  
          titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
          />
          </MDBCol>
          </MDBRow> 

          <MDBRow className="mt-4">
          <MDBCol md={4}>
          <form onSubmit={searchusername}>
            <MDBInputGroup>
            
                <MDBInput required name="username" label='Search by username'/>
                <MDBBtn type="submit">Search <MDBIcon fas icon="search"/></MDBBtn>
            
            </MDBInputGroup>
          </form>
          </MDBCol>
          <MDBCol md={4}>
          <form onSubmit={searchemail}>
          <MDBInputGroup>
            
                <MDBInput required name="email" label='Search by email'/>
                <MDBBtn type="submit">Search <MDBIcon fas icon="search"/></MDBBtn>
           
            </MDBInputGroup>
            </form>
          </MDBCol>
          <MDBCol md={4}>
            <MDBBtn className="mt-1 mx-2 fw-bold" 
            type="button" 
            color="danger"
            onClick={deleteItems}
            disabled={checkedItems.length === 0}
            >Ban Multiple
            </MDBBtn>
          </MDBCol>
          
          </MDBRow>    
          
          <MDBTable align='middle' className="border mt-4" responsive>
                  <MDBTableHead className="head text-center">
                      <tr >
                      <th className="fw-bold" scope='col'>Select</th>
                      
                      <th className="fw-bold" scope='col'>Username</th>
                      <th className="fw-bold" scope='col'>Sponsor</th>
                      <th className="fw-bold" scope='col'>Details</th>
                      <th className="fw-bold" scope='col'>Status</th>
                      <th className="fw-bold" scope='col'>Date Joined</th>
                      <th className="fw-bold" scope='col'>Action</th>
                      </tr>
                  </MDBTableHead>
                  <MDBTableBody className="text-center">
                  {member ?
                    <>
                  {handlePagination(member, page, 10)?.map((acc, i) =>(
                  <tr key={`acc-${i}`}>
                  <td>
                    <input type="checkbox"
                    checked={checkedItems.includes(acc.username)}
                    onChange={() => handleCheckboxChange(acc.username)} 
                    ></input>
                  </td>
                  
                  <td>
                  {acc.username}
                  </td>  
                  <td>{acc.referral}</td> 
                  <td>
                  <div className="d-flex flex-column">
                   <p>Email: {acc.email}</p> 
                   <p>Phone: {acc.phone}</p> 
                  </div>
                  </td>            
                  <td>{acc.status}</td> 
                  <td>{new Date(acc.createdAt).toLocaleString()}</td>              
                  <td>
                      <MDBBtn 
                      onClick={() => {
                        const url = `${window.location.origin}/dashboard/Administrator/memberprofile?username=${acc.username}`;
                        window.open(url, '_blank');
                      }}
                      >View</MDBBtn>
                      <MDBBtn 
                      className="mx-2 fw-bold" 
                      type="button" 
                      outline 
                      color="dark" 
                      onClick={() => deleteitem(acc.username)}>Ban</MDBBtn>
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
          </>
      )
  }
  
  export default MembersAccount;