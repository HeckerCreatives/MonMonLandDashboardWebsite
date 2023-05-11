import { MDBContainer, MDBInput, MDBRow, MDBCol,MDBIcon,MDBTypography,MDBBtn, MDBCard, MDBCardTitle, MDBCardBody } from "mdb-react-ui-kit";
import React, { useState } from "react";
import CreateProfile from "./steps/Createprofile";
import ChooseSubscription from "./steps/Choosesubscription";
import ChoosePayment from "./steps/Choosepayment";
import WelcomePage from "./steps/Welcomepage";

const SignUp = () => {
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
        <CreateProfile/>
      );
    case 2:
      return(
        <ChooseSubscription/>
      );
    case 3:
      return(
        <ChoosePayment/>
      );
    case 4:
      return(
        <WelcomePage/>
      );
    default:
      return(
        <MDBContainer></MDBContainer>
      )  
  }
    
}

export default SignUp;