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
import FullTable from "../../../../component/fulltablelist";
import Cards from "../../../../component/cards";
import { Link } from "react-router-dom";
import { handlePagination } from "../../../../component/utils"
// import ManageDashboard from "../../../component/dashboard/admin/manageplayer/managedashboard"
import "./index.css"
import PaginationPager from "../../../../component/pagination";
import Swal from "sweetalert2";
import UpdateAdminAccount from "./modal/edit";
import Cookies from 'js-cookie';
const CreateAdminAccount = () => {
  const [confirmpass, setConfirmPass] = useState(""),
        [adminaccounts, setAdminAcc] = useState([]),
        [checkedItems, setCheckedItems] = useState([]),
        [todayjoin, setTodaysJoin] = useState([]);
        // [txttable, setTxtTable] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  // const auth = JSON.parse(Cookies.get("auth"))
  const toggleShow = () => setCentredModal(!centredModal),
  [page, setPage] = useState(1),
  [isloading, setIsLoading] = useState(false),
  [total, setTotal] = useState(0);
    
    useEffect(() => {
        let totalPages = Math.floor(adminaccounts.length / 5);
        if (adminaccounts.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [adminaccounts]);

    useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}user/find`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      }
    })
    .then(result => result.json())
    .then(data => {

      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
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
      }

      const today = new Date().toLocaleDateString();
      const filteradmin = data.filter(e => e.roleId.display_name === "SubAdministrator" && e.banned === false)
      const todays = filteradmin.filter(e => {
        const createdAtDate = new Date(e.createdAt).toLocaleDateString();
        return createdAtDate === today;
      });
      setAdminAcc(filteradmin)
      setTodaysJoin(todays)
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
    
    const createadmin = (e) => {
      e.preventDefault();
      setIsLoading(true)
      const {firstName,lastName,userName, email, password, phone} = e.target
      if(password.value === confirmpass){
        fetch(`${process.env.REACT_APP_API_URL}user/register`,{
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roleId: process.env.REACT_APP_SUBADMINROLE,
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
          })
        }).then(result => result.json())
        .then(data => {
          if(data.expired){
            Swal.fire({
              icon: "error",
              title: data.expired == "duallogin" ? "Dual Login" : data.expired,
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
            if (!data.expired && data.message == "success") {
              setIsLoading(false)
              Swal.fire({
                title: "Admin Account Created Successfully",
                icon: "success",
                text: "You Successfully Created An Admin Account"
              }).then(result1 => {
                if(result1.isConfirmed){
                  window.location.reload()
                }
              })
              
            } else {
              setIsLoading(false)
              Swal.fire({
                title: "Unsuccessfull",
                icon: "error",
                text: "There is an error Creating Account"
              })
            }
          }

          
        })
      } else {
        setIsLoading(false)
        Swal.fire({
          title: "Password not Match",
          icon: "error",
          text: "Check Your Password"
        })
      }
      
    }

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
              fetch(`${process.env.REACT_APP_API_URL}user/${id}/destroy`,{
                  method: "DELETE",
                  credentials: 'include',
                  headers: {
                      'Content-Type': 'application/json',
                      // Authorization: `Bearer ${auth?.token}`,
                  }
              }).then(result => result.json())
              .then(data => {
                if(data.expired){
                  Swal.fire({
                    icon: "error",
                    title: data.expired == "duallogin" ? "Dual Login" : data.expired,
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
                  window.location.reload()
                }

                  
              })
              
          }
      })        
  }

  const deleteItems = () => {
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
        fetch(`${process.env.REACT_APP_API_URL}user/destroymultiple`, {
          method: "DELETE",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({ ids: checkedItems }),
        })
          .then((result) => result.json())
          .then((data) => {

            if(data.expired){
              Swal.fire({
                icon: "error",
                title: data.expired == "duallogin" ? "Dual Login" : data.expired,
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
              window.location.reload();
            }

            // if (data) {
              
            // }
          });
      }
    });
  };
    return(
      <>
        
        <MDBContainer fluid>
        
        <MDBRow>
        <MDBCol>
        
        <Breadcrumb title="Admin List"/>
        </MDBCol>        
        {/* <MDBCol md={3} className="">
            <MDBInput type="search"                
            label="Search">
            </MDBInput>        
        <MDBIcon fas icon="search" />        
        </MDBCol> */}
        </MDBRow>
        <MDBRow>
        <MDBCol md={6}>
        <Cards 
        title={adminaccounts.length}
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
        title={todayjoin.length} 
        texts="Todays Joinings" 
        icon="user-friends" 
        cardclassname={'shadow-3'}
        iconstyle={{background: "#556EE6", padding: "8px", borderRadius: "5px"}}
        itemcol={`d-flex align-items-center gap-3`}  
        titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
        />
        </MDBCol>
        </MDBRow>        
        <MDBBtn className=" mt-1 mx-2 fw-bold" type="button" outline color="dark" onClick={toggleShow}>
        <MDBIcon far icon="plus" size="lg"/>
        &nbsp; Create Admin Account
        </MDBBtn>
        <MDBBtn className="mt-1 mx-2 fw-bold" 
        type="button" 
        color="danger"
        onClick={deleteItems}
        disabled={checkedItems.length === 0}
        >Delete</MDBBtn>
        <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Select</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Email</th>
                    <th className="fw-bold" scope='col'>Phone</th>
                    <th className="fw-bold" scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                {adminaccounts ?
                  <>
                {handlePagination(adminaccounts, page, 5)?.map((acc, i) =>(
                <tr key={`acc-${i}`}>
                <td>
                  <input type="checkbox"
                  checked={checkedItems.includes(acc._id)}
                  onChange={() => handleCheckboxChange(acc._id)} 
                  ></input>
                </td>
                <td>{new Date(acc.createdAt).toLocaleString()}</td>
                <td>
                {acc.userName}
                </td>              
                <td>{acc.email}</td>
                <td>{acc.phone}</td>                
                <td>
                    <UpdateAdminAccount account={acc}/>
                    <MDBBtn className="mx-2 fw-bold" type="button" outline color="dark" onClick={() => deleteitem(acc._id)}>Delete</MDBBtn>
                </td>
                </tr>
                ))}
                </> 
                 : <span>No Data</span>}
                   
                </MDBTableBody>
                </MDBTable>
        <PaginationPager
            total={total} page={page} setPage={setPage}
        />
        </MDBContainer>

        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <form autoComplete="off" onSubmit={e => createadmin(e)}>
            <MDBModalHeader style={{background:"#A57552"}}>
              <MDBModalTitle className="text-light">Create an Admin Account</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
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
              <input name="userName" className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
                Password:
              </MDBCardText>
              <input name="password" type="password" className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
                Confirm Password:
              </MDBCardText>
              <input  className="square bordercolor rounded mb-2 p-1" type="password" style={{width:'100%'}} onChange={e => setConfirmPass(e.target.value)}  required></input>
              </MDBCardBody>
            </MDBCard>
            <MDBCardText className="mt-5 text-dark mb-0 fw-bold">
                Basic Information
            </MDBCardText>
            <MDBCard style={{background: "#EDCAB4"}}>
              <MDBCardBody>
              <MDBCardText className="text-color mb-0 fw-bold">
                Fisrt Name:
              </MDBCardText>
              <input name="firstName" className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
                Last Name:
              </MDBCardText>
              <input name="lastName" className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
                Email:
              </MDBCardText>
              <input name="email" className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              <MDBCardText className="text-color mb-0 fw-bold">
               Phone:
              </MDBCardText>
              <input name="phone" className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
              </MDBCardBody>
            </MDBCard>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type="button" color='secondary' onClick={toggleShow}>
                Cancel
              </MDBBtn>
              <MDBBtn type="submit">
              
              {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Create Account"}
              
              </MDBBtn>
            </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    )
}

export default CreateAdminAccount;