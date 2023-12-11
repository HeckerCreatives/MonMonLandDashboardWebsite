import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography,MDBTable, 
  MDBTableHead, 
  MDBTableBody, } from "mdb-react-ui-kit";
import LeaderboardRequirements from "./lbrequirements";
import Dashboardstatistics from "./statistics";
import Graph from "../../../component/graph";
import Breadcrumb from "../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DiamondPoolRequirements from "./poolrequirements";

const PlayerDashboard = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [users, setUsers] = useState([]);
    const [paidusers, setPaidUsers] = useState(0);

    // const [totalautopayment, setTotalAutoPayment] = useState([]);
    // const [AutoAndManual, setAutoAndManual] = useState([]);
    // const [autopayment, setAutoPayment] = useState([]);
    // const [totalpaidusers, setTotalPaidUsers] = useState([]);
    const navigate = useNavigate()

    const [request, setRequest] = useState(0)
    const [done, setDone] = useState(0)
    const [processed, setProcessed] = useState(0);
  
    // useEffect(() => {
    //   if (auth) {
    //     if (auth.roleId.display_name !== "SubAdministrator") {
    //       localStorage.removeItem("auth");
    //       navigate("/sessions/login");
    //     }
    //   }
    // }, [auth, navigate]);

    // useEffect(() => {
    //   fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${auth?.token}`,
    //     },
    //     body: JSON.stringify({
    //       status: "pending"
    //     })
    //   }).then(result => result.json())
    //   .then(data => {
    //     if(data.expired){
    //       Swal.fire({
    //         icon: "error",
    //         title: data.expired,
    //         text: "You Will Redirect to Login",
    //         allowOutsideClick: false,
    //         allowEscapeKey: false
    //       }).then(ok => {
    //         if(ok.isConfirmed){
    //           localStorage.removeItem("auth");
    //           localStorage.removeItem("playfabAdminAuthToken")
    //           window.location.replace("/login");
    //         }
    //       })
    //     }

    //       if(data.message === "success" && data.data.length !== 0 && !data.expired){
    //           setRequest(data?.data[0]?.amount)
    //       }
    //   })

    //   fetch(`${process.env.REACT_APP_API_URL}payout/agentpayoutwallet`,{
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${auth?.token}`,
    //     },
    //     body: JSON.stringify({
    //       adminId: auth._id,
    //       item: "process"
    //     })
    //   })
    //   .then(result => result.json())
    //   .then(data => {
    //     if(data.expired){
    //       Swal.fire({
    //         icon: "error",
    //         title: data.expired,
    //         text: "You Will Redirect to Login",
    //         allowOutsideClick: false,
    //         allowEscapeKey: false
    //       }).then(ok => {
    //         if(ok.isConfirmed){
    //           localStorage.removeItem("auth");
    //           localStorage.removeItem("playfabAdminAuthToken")
    //           window.location.replace("/login");
    //         }
    //       })
    //     }

    //     if(data.message === "success" && data.data.length !== 0 && !data.expired){
    //       setProcessed(data?.data[0]?.amount)
    //     }
    //   })

    //   fetch(`${process.env.REACT_APP_API_URL}payout/agentpayoutwallet`,{
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${auth?.token}`,
    //     },
    //     body: JSON.stringify({
    //       adminId: auth._id,
    //       item: "done"
    //     })
    //   })
    //   .then(result => result.json())
    //   .then(data => {
    //     if(data.expired){
    //       Swal.fire({
    //         icon: "error",
    //         title: data.expired,
    //         text: "You Will Redirect to Login",
    //         allowOutsideClick: false,
    //         allowEscapeKey: false
    //       }).then(ok => {
    //         if(ok.isConfirmed){
    //           localStorage.removeItem("auth");
    //           localStorage.removeItem("playfabAdminAuthToken")
    //           window.location.replace("/login");
    //         }
    //       })
    //     }

    //     if(data.message === "success" && data.data.length !== 0 && !data.expired){
    //       setDone(data?.data[0]?.amount)
    //     }
    //   })

    // //   fetch(`${process.env.REACT_APP_API_URL}payout/agentfind`, {
    // //       method: "POST",
    // //       headers: {
    // //           "Content-Type": "application/json"
    // //       },
    // //       body: JSON.stringify({
    // //           status: "done",
    // //           admin: auth.userName
    // //       })
    // //   }).then(result => result.json())
    // //   .then(data => {
    // //       if(data.message === "success"){
    // //           setDone(data.data)
    // //       }
    // //   })

    // //   fetch(`${process.env.REACT_APP_API_URL}payout/agentfind`, {
    // //     method: "POST",
    // //     headers: {
    // //         "Content-Type": "application/json"
    // //     },
    // //     body: JSON.stringify({
    // //         status: "process",
    // //         admin: auth.userName
    // //     })
    // // }).then(result => result.json())
    // // .then(data => {
    // //     if(data.message === "success"){
    // //       setProcessed(data.data)
    // //     }
    // // })
    // },[])

    // useEffect(()=>{
    //   let pending = 0;
    //   let approve = 0;
  
    //   for (let i = 0; i < processed.length; i++) {
    //     pending += processed[i].amount;
    //   }
  
    //   for (let i = 0; i < done.length; i++) {
    //     approve += done[i].amount;
    //   }
  
    //   setPendings(pending)
    //   setApproved(approve)
    // },[processed, done])

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}user/find`)
    .then(result => result.json())
    .then(data => {
      const active = data.filter(e => e.isVerified === true)
      const inactive = data.filter(e => e.isVerified === false)
      setUsers(data)
      // setActiveUsers(active)
      // setInActiveUsers(inactive)        
    })
        
  },[]) 

  // useEffect(()=>{
  //   fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
  //   .then(result => result.json())
  //   .then(data => {
  //     const cashier = data.filter(e => e.cashier === auth.userName) 
  //     setPaidUsers(cashier)
  //   })
  // },[])

//   useEffect(()=>{

//     fetch(`${process.env.REACT_APP_API_URL}coin/agentmanualwallet`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${auth?.token}`,
//       },
//       body: JSON.stringify({
//         adminId: auth._id,
//         name: "manual"
//       })
//     })
//     .then(result => result.json())
//     .then(data => {
//       if(data.expired){
//         Swal.fire({
//           icon: "error",
//           title: data.expired,
//           text: "You Will Redirect to Login",
//           allowOutsideClick: false,
//           allowEscapeKey: false
//         }).then(ok => {
//           if(ok.isConfirmed){
//             localStorage.removeItem("auth");
//             localStorage.removeItem("playfabAdminAuthToken")
//             window.location.replace("/login");
//           }
//         })
//       }

//       if(data.message === "success" && data.data.length !== 0 && !data.expired){
//         setPaidUsers(data?.data[0]?.amount)
//     }
      
//     })

//     // fetch(`${process.env.REACT_APP_API_URL}coin/find`, {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json"
//     //   },
//     //   body: JSON.stringify({status: "success"})
//     // })
//     // .then(result => result.json())
//     // .then(data => {
//     //   setAutoPayment(data.data)
//     // })


//   },[])

//   useEffect(()=>{
//     let totalPrice = 0;
//     let autoPrice = 0;

//     for (let i = 0; i < paidusers.length; i++) {
//       totalPrice += paidusers[i].price;
//     }
    

//     for (let i = 0; i < autopayment.length; i++) {
//       autoPrice += autopayment[i].amount;
//     }
    
//     setTotalAutoPayment(autoPrice)
//     setTotalPaidUsers(totalPrice)
//     setAutoAndManual(totalPrice + autoPrice)
// },[autopayment,paidusers])

    return (
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow className="my-2">
          <MDBCol className="my-2">
            <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Current Wallet Balance'}
              txtsup='0'
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Total Monster Coin'}
              txtsup='0'
              txtsup1='0'
              />
          </MDBCol>
          <MDBCol className="my-2">
          <Dashboardstatistics 
              colSpan="4"
              icon={`dollar-sign`}
              cardtoptext={'Total Monster Gem'}
              txtsup='0'
              txtsup1='0'
              />
          </MDBCol>
          
        </MDBRow>

        <MDBRow className="my-2">

          <MDBCol md={6} className="my-2">
          <LeaderboardRequirements/>
          </MDBCol>
          <MDBCol md={6} className="my-2">
          <DiamondPoolRequirements/>
          </MDBCol>
          
        </MDBRow>

        <MDBRow className="my-2">

          <MDBCol md={6} className="my-2">
          <MDBCard className="text-mute fw-bold">          
                <MDBCardBody>
                  <MDBTable responsive borderless className="text-mute mb-0">
                
                      <MDBTableBody className="fw-bold">
                          <tr>
                              <td>
                                  Total Points
                              </td>
                              <td>
                                  0
                              </td>
                          </tr>
                      </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
          </MDBCard>
          </MDBCol>

          <MDBCol md={6} className="my-2">
          <MDBCard className="text-mute fw-bold">          
                <MDBCardBody>
                  <MDBTable responsive borderless className="text-mute mb-0">
                
                      <MDBTableBody className="fw-bold">
                          <tr>
                              <td>
                                  Current Rank
                              </td>
                              <td>
                                  0
                              </td>
                          </tr>
                      </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
          </MDBCard>
          </MDBCol>
          
        </MDBRow>
        
        

        </MDBContainer>
        
    )
}

export default PlayerDashboard;