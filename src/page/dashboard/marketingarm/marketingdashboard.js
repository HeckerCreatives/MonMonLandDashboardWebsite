import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import DashCard from "../../../component/cards/dashcard";
import Graph from "../../../component/graph";
import Breadcrumb from "../../../component/breadcrumb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
const MarketingDashboard = () => {
    
    const auth = JSON.parse(Cookies.get("auth"))
    const [users, setUsers] = useState([]);
    const [totalsubsaccu, setTotalSubsAccu] = useState(0);
    const navigate = useNavigate()
    const [marketing, setMarketing] = useState(0)

  useEffect(() => {
      if (auth) {
        if (auth.roleId.display_name !== "Marketing") {
          Cookies.remove("auth", { path: '/' });;
          navigate("/login");
        }
      }
    }, [auth, navigate]);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}communityactivy/find`,{
        credentials: 'include',
      })
      .then(result => result.json())
      .then(data => {
        if(data.message === "success"){
          setMarketing(data.data.marketing)
        }
      })
    },[])
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}subsaccu/totalsubsaccu`,{
      method: "POST",
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
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

      setTotalSubsAccu(data.data)

      
    })
  },[])
  

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}user/find`,{
      credentials: 'include',
    })
    .then(result => result.json())
    .then(data => {
      const active = data.filter(e => e.isVerified === true)
      const inactive = data.filter(e => e.isVerified === false)
      setUsers(data)       
    })    
  },[]) 

    return (
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow className="my-2">
          <MDBCol className="my-2">
            <DashCard 
              colSpan="4"
              icon={`dollar-sign`}
              thtitle={`Total Marketing Arm`}
              cardtoptext={marketing ? `${marketing.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`: 0}
              txtsup={`USDT`} 
              />
          </MDBCol>
        </MDBRow>
        
        

        </MDBContainer>
        
    )
}

export default MarketingDashboard;