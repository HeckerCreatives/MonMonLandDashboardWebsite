import { MDBContainer, MDBInput, MDBRow, MDBCol,MDBIcon,MDBTypography,MDBBtn, MDBCard, MDBCardTitle, MDBCardBody } from "mdb-react-ui-kit";
import React, { useState } from "react";
import ChooseSubscription from "./steps/choosesubscription";
import SubscriptionReceipt from "./steps/subscriptionreceipt";
// import WelcomePage from "./steps/Welcomepage";
import EmailVerification from "./steps/emailverification";
import './index.css'
import logo from '../../assets/footer/logo white.png'
import VerificationProgress from "./progress/verificationprogress";
const StepVerification = () => {
  // for steps
  const [step, setStep] = useState(1);

  // state for data
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
  })
  
  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () =>{
    setStep(step- 1)
  }

  const handleInputData = input => e => {
    const {value} = e.target
    setFormData(prevState => ({
      ...prevState,
      [input]:value
    }))    
  }
  
  switch(step){
    case 1:
      return(
        <>
        <MDBContainer fluid className="d-flex align-items-center justify-content-center topbg">
        <img src={logo} alt="" className="img-fluid img"/>         
        </MDBContainer>
        <MDBTypography tag='h1' className="fw-bold text-black text-center p-3">4-Step Verification</MDBTypography>
        <VerificationProgress/>        
        <EmailVerification nextStep={nextStep}/>        
        </>
      );
    case 2:
      return(
        <>
        <MDBContainer fluid className="d-flex align-items-center justify-content-center topbg">
        <img src={logo} alt="" className="img-fluid img"/>         
        </MDBContainer>
        <MDBTypography tag='h1' className="fw-bold text-black text-center p-3">4-Step Verification</MDBTypography>
        <VerificationProgress/>         
        <ChooseSubscription nextStep={nextStep} prevStep={prevStep}/>
        
        </>
        
      );
    case 3:
      return(
        <>
        <MDBContainer fluid className="d-flex align-items-center justify-content-center topbg">
        <img src={logo} alt="" className="img-fluid img"/>         
        </MDBContainer>
        <MDBTypography tag='h1' className="fw-bold text-black text-center p-3">4-Step Verification</MDBTypography>
        <VerificationProgress/>         
        <SubscriptionReceipt/>        
        </>
        
      );
    // case 4:
    //   return(
    //     <WelcomePage/>
    //   );
    default:
      return(
        <MDBContainer>

        </MDBContainer>
      )  
  }
    
}

export default StepVerification;