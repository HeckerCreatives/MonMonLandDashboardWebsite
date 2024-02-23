import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography, MDBCardText, MDBInput } from "mdb-react-ui-kit";
import React , {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { Toast, logout } from "../../../../../component/utils.js";
import { useAccount, useDisconnect, useAccountEffect, useBalance } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
const PlayerMyProfile = ({user}) => {
    const [details, setDetails] = useState([]);
    const { address, isDisconnected } = useAccount()
    const { open, close } = useWeb3Modal()
    const { disconnect } = useDisconnect()
    useAccountEffect({
      onDisconnect() {
        logout()
        window.location.reload()
      },
    })
    

    useEffect(()=> {
      fetch(`${process.env.REACT_APP_API_URL}playerdetails/find`,{
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(result => result.json())
      .then(data => {
        if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
          Swal.fire({
            icon: "error",
            title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
            text: data.message == "duallogin" ? "Hi Master, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Master please contact admin" : "You Will Redirect to Login",
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(ok => {
            if(ok.isConfirmed){
              window.location.replace("/gamelogin");
            }
          })
        }

        if(data.message === "success"){
          setDetails(data.data) 
          const haswallet = data.data.walletaddress

          if(!haswallet || haswallet == ""){
            if(address){
              fetch(`${process.env.REACT_APP_API_URL}gameusers/savewalletaddress`,{
                method: "POST",
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  walletaddress: address
                })
              })
              .then(result => result.json())
              .then(data => {
                Toast.fire({
                  icon: 'success',
                  title: 'Wallet Save successfully'
                })
              })
            }
          }

        }
      })
    },[]) 

    useEffect(()=>{
      if(details.walletaddress){
        if(address && address != details.walletaddress){
          Swal.fire({
            title: "Wallet Change",
            icon: "info",
            text: "wallet not match",
            allowEscapeKey: false,
            allowOutsideClick: false
          }).then(ok => {
            if(ok.isConfirmed){
              logout()
              disconnect()
              window.location.reload()
            }
          })
          
        }
      }

      if(details.walletaddress && !address){
        open()
      }
    },[address, details])
      
      const changedetails = (e) => {
        e.preventDefault();
        const { email, phone } = e.target
  
        fetch(`${process.env.REACT_APP_API_URL}playerdetails/update`,{
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email ? email.value : details.email,
            phone: phone ? phone.value : details.phone
          })
        })
        .then(result => result.json())
        .then(data => {
          if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
            Swal.fire({
              icon: "error",
              title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
              text: data.message == "duallogin" ? "Hi Master, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Master please contact admin" : "You Will Redirect to Login",
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(ok => {
              if(ok.isConfirmed){
                window.location.replace("/gamelogin");
              }
            })
          }
          
          if(data.message === "success"){
            Swal.fire({
              title: data.message,
              icon: "success",
              text: "You updated your details"
            }).then(ok => {
              if(ok.isConfirmed){
                window.location.reload()
              }
            })
          } else {
            Swal.fire({
              title: "Warning",
              icon: "info",
              text: "Something went wrong please try again."
            })
          }
        })
      }

      const kapy = (text) => {
        
        if(text){
            navigator.clipboard.writeText(text)
            Toast.fire({
                icon: 'success',
                title: 'Copy successfully'
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'No text to copy'
            }) 
        }
        
      }

 return(
    <MDBContainer>
    <MDBCard shadow="5" style={{background: '#FCF2E1'}}>
      <MDBCardBody>
      <MDBRow>
          <MDBCol>
          <div>
          <MDBTypography tag={'h2'} className="my-2">
            Connect Your Wallet
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            

            <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">My Wallet:</MDBTypography>
                </div>

                <div className="col-md-3">
                <w3m-button 
                // balance="hide" 
                // disabled 
                size="sm"/>

                </div>
              </div>
              
            
            </MDBCardBody>
          </MDBCard>
          </div>
          
          </MDBCol>
          
      </MDBRow>
      <MDBRow>
          <MDBCol>
          <div>
          <MDBTypography tag={'h2'} className="my-2">
            My Profile
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            <div className="">
              <div className="row d-flex align-items-center my-2">
                <div className="col-md-1 pe-0">
                <MDBCardText className="m-0">Username:</MDBCardText>
                </div>
                <div className="col-md-3">
                <MDBInput label={user} disabled/>
                </div>
              </div>
            </div>
            
            <form onSubmit={changedetails} className=" my-2">
              <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Phone:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="phone" label={details.phone} />
                </div>

                <div className="col-md-3">
                  <MDBBtn type="submit" size="sm">
                    Change Phone
                  </MDBBtn>
                </div>
              </div>
            </form>

            <form onSubmit={changedetails} className=" my-2">
              <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Email:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="email" label={details.email} />
                </div>

                <div className="col-md-3">
                  <MDBBtn type="submit" size="sm">
                    Change Email
                  </MDBBtn>
                </div>
              </div>
            </form>

            <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Referral Link:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="email" value={`${window.location.origin}/register?id=${details.owner}`} readOnly/>
                </div>

                <div className="col-md-3">
                  <MDBBtn floating tag={'a'} size="sm" 
                  onClick={() => kapy(`${window.location.origin}/register?id=${details.owner}`)}
                  >
                  <MDBIcon fas icon="clone" />
                  </MDBBtn>
                </div>
              </div>
              
            
            </MDBCardBody>
          </MDBCard>
          </div>
          
          </MDBCol>
          
      </MDBRow>
      <MDBRow>
          <MDBCol>
          <div>
          <MDBTypography tag={'h2'} className="my-2">
            Migration Link
          </MDBTypography>
          <MDBCard>
            <MDBCardBody>
            

            <div className="row d-flex align-items-center">
                <div className="col-md-1">
                  <MDBTypography className="m-0">Migration Link:</MDBTypography>
                </div>

                <div className="col-md-3">
                  <MDBInput required name="email" value={`${window.location.origin}/migrateph1?username=${user}`} readOnly/>
                </div>

                <div className="col-md-3">
                  <MDBBtn floating tag={'a'} size="sm" 
                  onClick={() => kapy(`${window.location.origin}/migrateph1?username=${user}`)}
                  >
                  <MDBIcon fas icon="clone" />
                  </MDBBtn>
                </div>
              </div>
              
            
            </MDBCardBody>
          </MDBCard>
          </div>
          
          </MDBCol>
          
      </MDBRow>
      </MDBCardBody>
    </MDBCard>
     
    </MDBContainer>
    
 )
}

export default PlayerMyProfile;