import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import DashCard from "../../../component/cards/dashcard";
import Graph from "../../../component/graph";
import Breadcrumb from "../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { isLogin } from "../../../component/utils";
const SubAdminDashboard = () => {
    // const auth = JSON.parse(decodeURIComponent(Cookies.get('auth')))
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
    const [role, setrole]= useState('');
    const [name, setname]= useState('');
    const [id, setid]= useState('');

  useEffect(() => {
    isLogin()
      .then(data => {
        setrole(data.role)
        setname(data.name)
        setid(data.id)
    })
  },[role, id, name])

  useEffect(() => {
      if (role) {
        if (role !== "SubAdministrator") {
          Cookies.remove("sessionToken");;
          navigate("/login");
        }
      }
    }, [role, navigate]);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}payout/payoutwallet`,{
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          status: "pending"
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
        }

          if(data.message === "success" && data.data.length !== 0 && !data.expired){
              setRequest(data?.data[0]?.amount)
          }
      })

      fetch(`${process.env.REACT_APP_API_URL}payout/agentpayoutwallet`,{
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          
          item: "process"
        })
      })
      .then(result => result.json())
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
              Cookies.remove("auth");;
              Cookies.remove("playfabAdminAuthToken");
              window.location.replace("/login");
            }
          })
        }

        if(data.message === "success" && data.data.length !== 0 && !data.expired){
          setProcessed(data?.data[0]?.amount)
        }
      })

      fetch(`${process.env.REACT_APP_API_URL}payout/agentpayoutwallet`,{
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          
          item: "done"
        })
      })
      .then(result => result.json())
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
        }

        if(data.message === "success" && data.data.length !== 0 && !data.expired){
          setDone(data?.data[0]?.amount)
        }
      })

    //   fetch(`${process.env.REACT_APP_API_URL}payout/agentfind`, {
    //       method: "POST",
    //       headers: {
    //           "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //           status: "done",
    //           admin: auth.userName
    //       })
    //   }).then(result => result.json())
    //   .then(data => {
    //       if(data.message === "success"){
    //           setDone(data.data)
    //       }
    //   })

    //   fetch(`${process.env.REACT_APP_API_URL}payout/agentfind`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         status: "process",
    //         admin: auth.userName
    //     })
    // }).then(result => result.json())
    // .then(data => {
    //     if(data.message === "success"){
    //       setProcessed(data.data)
    //     }
    // })
    },[])

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
    fetch(`${process.env.REACT_APP_API_URL}user/find`,{
      credentials: 'include',
    })
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

  useEffect(()=>{

    fetch(`${process.env.REACT_APP_API_URL}coin/agentmanualwallet`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
          
        name: "manual"
      })
    })
    .then(result => result.json())
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
      }

      if(data.message === "success" && !data.expired){
        setPaidUsers(data?.data?.amount)
    }
      
    })

    // fetch(`${process.env.REACT_APP_API_URL}coin/find`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({status: "success"})
    // })
    // .then(result => result.json())
    // .then(data => {
    //   setAutoPayment(data.data)
    // })


  },[])

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
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Manual Top-Up`}
              cardtoptext={paidusers  ? paidusers?.toLocaleString(): 0}
              txtsup={`USDT`}
              />
          </MDBCol>
          <MDBCol className="my-2">
          <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Pay-out`}
              cardtoptext={done  ? done?.toLocaleString(): 0}
              txtsup={`USDT`}  
              td1={true}
              td1txttop={request  ? request?.toLocaleString(): 0}
              td1txtbot={`Pending`} 
              td2={true}
              td2txttop={processed  ? processed?.toLocaleString(): 0}
              td2txtbot={`Process`}
              td3={true}
              td3txttop={done  ? done?.toLocaleString(): 0}
              td3txtbot={`Done`}
              />
          </MDBCol>
          
        </MDBRow>
        
        

        </MDBContainer>
        
    )
}

export default SubAdminDashboard;