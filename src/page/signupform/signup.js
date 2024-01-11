import { MDBContainer, MDBInput, MDBRow, MDBCol,MDBIcon,MDBTypography,MDBBtn, MDBCard, MDBCardTitle, MDBCardBody, MDBCheckbox,MDBSpinner,MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, } from "mdb-react-ui-kit";
import React, { useEffect, useState, useRef,useCallback } from "react";
import logo from "../../assets/header/small logo for navi.png"
import './signup.css'
import Swal from "sweetalert2";
import { GoogleReCaptchaProvider, GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Monmonregister } from "../../component/playfab/playfabregistration";

const SignUp = () => {
  const [phone, setPhone] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [confirmpassword, setconfirmPassword] = useState('')
  const [referrer, setReferrer] = useState('');
  const [referrerid, setReferrerId] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [tokenC, setToken] = useState("");
  const captchaRef = useRef(null)
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  

  const toggleShow = () => setBasicModal(!basicModal);
  useEffect(()=> {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    const id = params.get('id');
    fetch(`${process.env.REACT_APP_API_URL}gameusers/findreferrer/${id}`)
    .then(result => result.json())
    .then(data => {
      if(data.message === "success"){
        setReferrerId(id)
        setReferrer(data.data)
      } else {
        Swal.fire({
          title: "Warning",
          icon: "info",
          text: data.data,
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.reload()
          }
        })
      }
    })
    

  },[])

  
  const register = async (e) => {
    e.preventDefault();
    const specialchar = /^[a-zA-Z0-9]+$/;
    if(!specialchar.test(userName) || !specialchar.test(password)){
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: "Special Characters is not allowed"
      })
      return
    } else {
      if (password !== confirmpassword){
        Swal.fire({
          title: "Password Not Match",
          icon: "error",
          text: "There is an error typing your password"
        })
        return 
      }
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_API_URL}gameusers/register`, {
        method:'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          referral: referrerid,
          username: userName.toLowerCase(),
          phone: phone,
          email: email,
          password: password,
          // token: tokenC
        })
      }).then(result => result.json())
      .then((data) => {
        if(data.message === "success"){
          setIsLoading(false) 
          Swal.fire({
            title: "Registered Successfully",
            icon: "success",
            text: data.data
          }).then(ok => {
            if(ok.isConfirmed){
              // setRefreshReCaptcha(r => !r);
              window.location.href="/"
            }
          })
        } else {
          Swal.fire({
            title: data.message,
            icon: "error",
            text: data.data
          })
          setIsLoading(false)
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed",
          icon: "error",
          text: "We are currently experiencing a high volume of user registrations. Please kindly consider trying again at a later time. Thank you for your patience."
        })
        setIsLoading(false)
      });
      
    }
    
  }
  const onVerify = useCallback((token) => {
    setToken(token);
  },[]);


    return(
      <>
        <MDBContainer 
        fluid 
        className="min-vh-100 text-black align-items-stretch d-flex" 
               
        >
        <MDBRow className="">
        <MDBCol lg={4} className="sidebg d-flex align-items-center text-dark text-center">
        <MDBContainer fluid >
        <MDBCol className="text fs-6">
        <h1 >Register Now!</h1>
          <p >Join us on this extraordinary adventure, and together, let's travel on an epic journey that will lead us through the lands of Monmonland.  Become a Monmon master, honing our skills and forging unbreakable bonds with our Money Monsters. Create your account by filling up the requirements. So, what are you waiting for? Let's band together and make our mark on the ever-expanding tapestry of Monmonland, creating unforgettable memories and stories that will be told for generations to come!</p>
        </MDBCol>          
          </MDBContainer>
        </MDBCol>          

          <MDBCol
          // size={12}
          // sm={10}
          // md={8}
          // lg={6}
          // className="offset-lg-3 offset-md-2 offset-sm-1"
          className="d-flex align-items-center"
          >
          <MDBContainer>
          <MDBCol className="text-center text-lg-start mt-5 mt-lg-0">
          <img alt="" src={logo}/>
          <MDBTypography className="mb-0 mt-3 fw-bold">Welcome,</MDBTypography>
          <MDBTypography className="fw-bold">Create your account in <span className="text-warning">few seconds</span></MDBTypography>
          </MDBCol>
          
          {/* <GoogleReCaptchaProvider
          reCaptchaKey={process.env.REACT_APP_SITE_KEY}
          >
          <GoogleReCaptcha 
            onVerify={onVerify}
            refreshReCaptcha={refreshReCaptcha}
            /> */}
          <form  autoComplete="off" onSubmit={register}>
          <MDBCard className="shadow-3 ">
          <MDBCardBody>
          
          {/* <MDBCardTitle tag={'h1'} className="">Sign Up</MDBCardTitle> */}
          <MDBRow>
          <MDBCol lg={6}>
          <MDBTypography className="mb-0">
            Username        
          </MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setUserName(e.target.value)} style={{width:'100%'}} placeholder="Enter Username here" maxLength={15} required></input>
          
          </MDBCol>
          <MDBCol lg={6}>
          <MDBTypography className="mb-0">Email</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setEmail(e.target.value)} style={{width:'100%'}} placeholder="Enter E-mail Address here" type="email" required></input>
          
          </MDBCol>
          
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setPassword(e.target.value)} style={{width:'100%'}} placeholder="Enter Password here" type='password' maxLength={15} required></input>
          
          </MDBCol>
          <MDBCol md={6}>
          <MDBTypography className="mb-0">Confirm Password</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setconfirmPassword(e.target.value)} style={{width:'100%'}} placeholder="Confirm Password here" type="password" maxLength={15}></input>
          </MDBCol>
          <MDBCol md={6}>

          <MDBTypography className="mb-0">Phone</MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" onChange={e => setPhone(e.target.value)} style={{width:'100%'}} placeholder="Enter Phone Number here" type="tel" required></input>
          </MDBCol>

          <MDBCol lg={6}>   
          <MDBTypography className="mb-0">
          Referral
          </MDBTypography>
          <input className="square border border-dark rounded mb-2 p-1" style={{width:'100%'}} defaultValue={referrer} readOnly></input>
          </MDBCol>         

          </MDBRow>
          <MDBCol className="d-flex">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' required/>
          <span>Accept our</span>&nbsp;<span style={{color: "blue", cursor: "pointer"}} onClick={toggleShow}>Terms and Condition</span>
          </MDBCol>  
          
          </MDBCardBody>

          </MDBCard>
          <MDBRow>
          <MDBCol>
          
          <MDBBtn type="submit" color="primary" className="mt-3 ms-md-auto d-flex" disabled={isloading}>
            {isloading ? <MDBSpinner grow size="sm" /> : "Create Account"}  
          </MDBBtn>
          </MDBCol>
          
          </MDBRow>
          </form>
          {/* </GoogleReCaptchaProvider> */}

                  
          
          </MDBContainer>
          </MDBCol>

        </MDBRow>
        
        </MDBContainer>

        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size="lg" scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Terms and Condition</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBTypography tag="h2">Terms and Conditions</MDBTypography>

              <MDBTypography tag="p">Please read these terms and conditions ("terms and conditions", "terms") carefully before using MONMONLAND("service").</MDBTypography>

              <MDBTypography tag="h3">Conditions of use</MDBTypography>

              <MDBTypography tag="p">By using this, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave accordingly. We only grants use and access of this platform, its products, and its services to those who have accepted its terms.</MDBTypography>

              <MDBTypography tag="h3">Privacy policy</MDBTypography>

              <MDBTypography tag="p">Before you continue using our website, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.</MDBTypography>

              <MDBTypography tag="h3">Age restriction</MDBTypography>

              <MDBTypography tag="p">You must be at least 13 (eighteen) years of age before you can use this platform. By using this website, you warrant that you are at least 13 years of age, and you may legally adhere to this Agreement. We assume no responsibility for liabilities related to age misrepresentation.</MDBTypography>

              <MDBTypography tag="h3">Intellectual property</MDBTypography>

              <MDBTypography tag="p">You agree that all materials, products, and services provided on this platform are the property of MONMONLAND, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the MONMONLAND’s intellectual property in any way, including electronic, digital, or new trademark registrations.</MDBTypography>

              <MDBTypography tag="p">
              You grant MONMONLAND a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company to come to an agreement.
              </MDBTypography>

              <MDBTypography tag="h3">User accounts</MDBTypography>

              <MDBTypography tag="p">As a user of this platform, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.</MDBTypography>
              
              <MDBTypography tag="p">
              If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.
              </MDBTypography>

              <MDBTypography tag="p">
              We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.
              </MDBTypography>

              <MDBTypography tag="h3">Applicable law</MDBTypography>

              <MDBTypography tag="p">By visiting this platform, you agree that the laws of the Republic of the Philippines without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between MONMONLAND and you, or its business partners and associates.</MDBTypography>
              
              <MDBTypography tag="h3">Disputes</MDBTypography>

              <MDBTypography tag="p">
              Any dispute related in any way to your visit to this platform or to products you purchase from us shall be arbitrated by state or federal court of the Republic of the Philippines and you consent to exclusive jurisdiction and venue of such courts.
              </MDBTypography>

              <MDBTypography tag="h3">Indemnification</MDBTypography>

              <MDBTypography tag="p">
              You agree to indemnify MONMONLAND and its affiliates and hold MONMONLAND harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel. 
              </MDBTypography>

              <MDBTypography tag="h3">Limitation on liability</MDBTypography>

              <MDBTypography tag="p">
              MONMONLAND is not liable for any damages that may occur to you as a result of your misuse of this platform.
              </MDBTypography>
              
              <MDBTypography tag="p">
              MONMONLAND reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between MONMONLAND and the user, and this supersedes and replaces all prior agreements regarding the use of this platform.
              </MDBTypography>
              
              <hr/>

              <MDBTypography tag="h2">Privacy Policy</MDBTypography>
              
              <MDBTypography tag="p">
              We respects the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform. Please read this Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION.
              </MDBTypography>

              <MDBTypography tag="p">
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted. 
              </MDBTypography>

              <MDBTypography tag="p">
              This Privacy Policy does not apply to the third-party online/mobile store from which you install the Application, including any in-game virtual items, which may also collect and use data about you. We are not responsible for any of the data collected by any such third party.  
              </MDBTypography>

              <MDBTypography tag="h3">COLLECTION OF YOUR INFORMATION</MDBTypography>

              <MDBTypography tag="p">
              We may collect information about you in a variety of ways. The information we may collect via the platform includes your personal data that may be needed on the payment policy: 
              </MDBTypography>

              <MDBTypography tag="h3">DISCLOSURE OF YOUR INFORMATION </MDBTypography>

              <MDBTypography tag="p">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows: 
              </MDBTypography>

              <MDBTypography tag="h3">By Law or to Protect Rights</MDBTypography>

              <MDBTypography tag="p">
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction. 
              </MDBTypography>

              <MDBTypography tag="h3">Third-Party Service Providers</MDBTypography>

              <MDBTypography tag="p">
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. 
              </MDBTypography>

              <MDBTypography tag="h3">Marketing Communications</MDBTypography>

              <MDBTypography tag="p">
              With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law. 
              </MDBTypography>

              <MDBTypography tag="h3">Interactions with Other Users</MDBTypography>

              <MDBTypography tag="p">
              If you interact with other users of the platform, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs.
              </MDBTypography>

              <MDBTypography tag="h3">Online Postings</MDBTypography>

              <MDBTypography tag="p">
              IWhen you post comments, contributions or other content to the platform, your posts may be viewed by all users and may be publicly distributed outside the Application in perpetuity.
              </MDBTypography>

              <MDBTypography tag="h3">Sale or Bankruptcy</MDBTypography>

              <MDBTypography tag="p">
              If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity. If we go out of business or enter bankruptcy, your information would be an asset transferred or acquired by a third party. You acknowledge that such transfers may occur and that the transferee may decline honor commitments we made in this Privacy Policy. 
              </MDBTypography>

              <MDBTypography tag="p">
              We are not responsible for the actions of third parties with whom you share personal or sensitive data, and we have no authority to manage or control third-party solicitations. If you no longer wish to receive correspondence, emails or other communications from third parties, you are responsible for contacting the third party directly.  
              </MDBTypography>

              <hr/>

              <MDBTypography tag="h2">TRACKING TECHNOLOGIES</MDBTypography>

              <MDBTypography tag="h3">Cookies and Web Beacons</MDBTypography>

              <MDBTypography tag="p">
              We may use cookies, web beacons, tracking pixels, and other tracking technologies to help customize and improve your experience. When you access the platform, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality. You may not decline web beacons. However, they can be rendered ineffective by declining all cookies or by modifying your web browser’s settings to notify you each time a cookie is tendered, permitting you to accept or decline cookies on an individual basis.
              </MDBTypography>

              <MDBTypography tag="h3">Internet-Based Advertising</MDBTypography>
              
              <MDBTypography tag="p">
              Additionally, we may use third-party software to serve ads on the platform, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us. For more information about opting-out of interest-based ads, visit the Network Advertising Initiative Opt-Out Tool or Digital Advertising Alliance Opt-Out Tool.
              </MDBTypography>

              <MDBTypography tag="h3">THIRD-PARTY WEBSITES</MDBTypography>
              
              <MDBTypography tag="p">
              The platform may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information. We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services or applications that may be linked to or from tis platform.
              </MDBTypography>

              <MDBTypography tag="h3">SECURITY OF YOUR INFORMATION </MDBTypography>
              
              <MDBTypography tag="p">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
              </MDBTypography>

              <MDBTypography tag="h3">POLICY FOR CHILDREN :  </MDBTypography>
              
              <MDBTypography tag="p">
              We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below. 
              </MDBTypography>

              <MDBTypography tag="h3">CONTROLS FOR DO-NOT-TRACK FEATURES : Not applicable</MDBTypography>
              
              <MDBTypography tag="p">
              Most web browsers and some mobile operating systems [and our mobile applications] include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.
              </MDBTypography>

              <MDBTypography tag="h3">OPTIONS REGARDING YOUR INFORMATION</MDBTypography>
              
              <MDBTypography tag="p">
              You may at any time review or change the information in your account or terminate your account by:
              </MDBTypography>

              <ul>
                <li>Logging into your account settings and updating your account</li>
                <li>Contacting us using the contact information provided below</li>
                <li>Other</li>
              </ul>

              <MDBTypography tag="p">
              Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements. 
              </MDBTypography>

              <MDBTypography tag="h3">Emails and Communications </MDBTypography>

              <MDBTypography tag="p">
              If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by: 
              </MDBTypography>

              <ul>
                <li>Noting your preferences at the time you register your account with the Application </li>
                <li>Logging into your account settings and updating your preferences.</li>
                <li>Contacting us using the contact information provided below </li>
              </ul>

              <MDBTypography tag="p">
              If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly. 
              </MDBTypography>

            </MDBModalBody>


            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
        </MDBModal>

        
      </>
    )
}

export default SignUp;