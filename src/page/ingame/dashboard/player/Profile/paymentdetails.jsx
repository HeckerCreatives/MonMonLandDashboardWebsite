import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography, MDBCardText, MDBInput } from "mdb-react-ui-kit";
import React , {useState, useEffect} from "react";
import Swal from "sweetalert2";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address"
const PlayerPaymentDetails = () => {
  const [edit, setEdit] = useState(true)
  const [paymentmethod, setPaymentMethod] = useState("")
  const [detail, setdetail] = useState([])
  const [country, setcountry] = useState('')
  const [kantry, setkantry] = useState(false)

  const list = [
    { name: "Asia United Bank", accountType: "AUB" },
    { name: "Banco de Oro", accountType: "BDO" },
    { name: "BPI", accountType: "BPI" },
    { name: "BPI Family Bank", accountType: "BFB" },
    { name: "Chinabank", accountType: "CBC" },
    { name: "EastWest", accountType: "EWB" },
    { name: "Landbank", accountType: "LBP" },
    { name: "Metrobank", accountType: "MBTC" },
    { name: "PNB individual", accountType: "PNB" },
    { name: "RCBC - Savings Bank, MyWallet", accountType: "RCBC" },
    { name: "Robinsons Bank", accountType: "RSB" },
    { name: "Security Bank", accountType: "SBC" },
    { name: "Unionbank - EON", accountType: "UBP" },
    { name: "UCPB", accountType: "UCPB" },
    { name: "Cebuana Lhuillier Cash Pick-up", accountType: "CEBL" },
    { name: "LBC Cash Pick-up", accountType: "LBC" },
    { name: "MLhuillier Cash Pick-up", accountType: "MLH" },
    { name: "Palawan Pawnshop Cash Pick-up (reserved)", accountType: "PLWN" },
    { name: "PeraHub Cash Pick-up", accountType: "PRHB" },
    { name: "RCBC/RCBC Savings Bank Cash Pick-up (reserved)", accountType: "RCBP" },
    { name: "RD Pawnshop Cash Pick-up", accountType: "RDP" },
    { name: "Villarica Cash Pick-up", accountType: "VLRC" },
    { name: "Coins.ph E-Wallet (reserved)", accountType: "BITC" },
    { name: "Gcash E-Wallet", accountType: "GCSH" },
    { name: "Smart Money (reserved)", accountType: "SMRT" },
    { name: "Maybank", accountType: "MAY" },
    { name: "Sterling Bank of Asia", accountType: "SBA" },
    { name: "Development Bank of the Philippines", accountType: "DBP" },
    { name: "Philippine Bank of Communications", accountType: "PBCM" },
    { name: "Philippine Savings Bank", accountType: "PSB" },
    { name: "Philippine Veterans Bank", accountType: "PVB" },
    { name: "Bank of Commerce", accountType: "BOC" },
    { name: "Chinabank Savings Bank", accountType: "CBCS" },
    { name: "Chinatrust", accountType: "CTBC" },
    { name: "Smart PayMaya", accountType: "PYMY" },
    { name: "GrabPay E-Wallet", accountType: "GRPY" },
    { name: "Coins.ph E-Wallet", accountType: "BITC" },
    { name: "Crypto - USDT (TRX20)", accountType: "CRYPTO" }
  ]

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}gamewallet/findpaymentdetail`,{
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(result => result.json())
    .then(data => {
      if(data.message == 'success'){
        setdetail(data.data)
      }
      
    })
    
    if(country.toUpperCase() !== "PH"){
      setkantry(true)
    } else {
      setkantry(false)
    }
  },[country])

  const handlepaymethod = (value) => {
    setPaymentMethod(value)
  }

  const savedetails = (e) => {
    e.preventDefault();

    const {
      firstname,
      middlename,
      lastname,
      email,
      mobilenumber,
      birthdate,
      nationality,
      street1, 
      street2, 
      barangay, 
      city, 
      province, 
      country,
      paymentdetail } = e.target

      if(country.value.toUpperCase() !== "PH" && detail.address.Country !== "PH"){
        Swal.fire({
          title: "Are you sure?",
          text: "You want to save this payment details",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${process.env.REACT_APP_API_URL}gamewallet/paymentdetail`,{
              method: "POST",
              credentials: 'include',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                firstname: firstname.value !== "" ? firstname.value : detail.firstname,
                middlename: middlename.value !== "" ? middlename.value : detail.middlename,
                lastname: lastname.value !== "" ? lastname.value : detail.lastname,
                email: email.value !== "" ? email.value : detail.email,
                mobilenumber: mobilenumber.value !== "" ? mobilenumber.value : detail.mobilenumber,
                birthdate: birthdate.value !== "" ? birthdate.value : detail.birthdate,
                nationality: nationality.value !== "" ? nationality.value : detail.nationality,
                street1: "", 
                street2: "", 
                barangay: "", 
                city: "", 
                province: "", 
                country: country.value !== "" ? country.value.toUpperCase() : detail.address.Country,
                paymentmethod: paymentmethod !== "" ? paymentmethod : detail.paymentmethod,
                paymentdetail: paymentdetail.value !== "" ? paymentdetail.value : detail.paymentdetail
              })
          })
          .then(result => result.json())
          .then(data => {
            Swal.fire({
              title: data.message,
              text: data.data,
              icon: "success"
            }).then(() => {
              window.location.reload()
            })
          })
          }
        })
        .catch((err) => {
          Swal.fire({
            title: err,
            text: "Something went wrong please try again later.",
            icon: "error"
          });
        })
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to save this payment details",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${process.env.REACT_APP_API_URL}gamewallet/paymentdetail`,{
              method: "POST",
              credentials: 'include',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                firstname: firstname.value !== "" ? firstname.value : detail.firstname,
                middlename: middlename.value !== "" ? middlename.value : detail.middlename,
                lastname: lastname.value !== "" ? lastname.value : detail.lastname,
                email: email.value !== "" ? email.value : detail.email,
                mobilenumber: mobilenumber.value !== "" ? mobilenumber.value : detail.mobilenumber,
                birthdate: birthdate.value !== "" ? birthdate.value : detail.birthdate,
                nationality: nationality.value !== "" ? nationality.value : detail.nationality,
                street1: street1.value !== "" ? street1.value : detail.address.Street1, 
                street2: street2.value !== "" ? street2.value : detail.address.Street2, 
                barangay: barangay.value !== "" ? barangay.value : detail.address.Barangay, 
                city: city.value !== "" ? city.value : detail.address.City, 
                province: province.value !== "" ? province.value : detail.address.Province, 
                country: country.value !== "" ? country.value.toUpperCase() : detail.address.Country,
                paymentmethod: paymentmethod !== "" ? paymentmethod : detail.paymentmethod,
                paymentdetail: paymentdetail.value !== "" ? paymentdetail.value : detail.paymentdetail
              })
          })
          .then(result => result.json())
          .then(data => {
            Swal.fire({
              title: data.message,
              text: data.data,
              icon: "success"
            }).then(() => {
              window.location.reload()
            })
          })
          }
        })
        .catch((err) => {
          Swal.fire({
            title: err,
            text: "Something went wrong please try again later.",
            icon: "error"
          });
        })
      }

      

  }
    
 return(
    <MDBContainer>
        <MDBRow>
          <MDBCol>
            <div>
              <MDBTypography tag={'h2'} className="my-2">
                Payment Details
              </MDBTypography>
              <form autoComplete="off" onSubmit={savedetails}>
              <MDBCard>
                <MDBCardBody>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                    <MDBCardText className="m-0">First Name:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput name="firstname" disabled={edit} label={detail?.firstname} required={detail?.firstname ? false: true}/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    
                    <div className="col-md-2">
                      <MDBCardText className="m-0">Middle Name:</MDBCardText>
                    </div>
                    <div className="col-md-3">
                      <MDBInput name="middlename" disabled={edit} label={detail?.middlename} required={detail?.middlename ? false : true}/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                    <MDBCardText className="m-0">Last Name:</MDBCardText>
                    </div>
                    <div className="col-md-3">
                      <MDBInput name="lastname" disabled={edit} label={detail?.lastname} required={detail?.lastname ? false : true}/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                        <MDBCardText className="m-0">Email:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput name="email" disabled={edit} label={detail?.email} required={detail?.email ? false : true}/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                    <MDBCardText className="m-0">Mobile Number:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput name="mobilenumber" disabled={edit} label={detail?.mobilenumber} required={detail?.mobilenumber ? false : true}/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                    <MDBCardText className="m-0">Birthdate:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput name="birthdate" type="date" disabled={edit} label={detail?.birthdate} required={detail?.birthdate ? false : true}/>
                    </div>
                  </div>
                  <div className="row d-flex align-items-center my-1">
                    <div className="col-md-2">
                    <MDBCardText className="m-0">Nationality:</MDBCardText>
                    </div>
                    
                    <div className="col-md-3">
                      <MDBInput name="nationality"  disabled={edit} label={detail?.nationality} required={detail?.nationality ? false : true}/>
                    </div>
                  </div>
                  <div>
                    <MDBTypography tag={'h4'}>Address:</MDBTypography>
                    <MDBCol className=" ">
                      <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                          <MDBCardText className="m-0">Country:</MDBCardText>
                        </div>
                        <div className="col-md-3">
                          <MDBInput name="country" disabled={edit} label={detail?.address?.Country} required={detail?.address?.Country ? false : true} 
                          onChange={(e) => setcountry(e.target.value)}/>
                          <div  className='form-text'>
                          ISO Country code (ex. PH)
                          </div>
                        </div>
                      </div>
                      <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                          <MDBCardText className="m-0">Street1:</MDBCardText>
                        </div>
                        
                        <div className="col-md-3">
                          <MDBInput 
                          name="street1" type="" 
                          disabled={kantry} label={detail?.address?.Street1} 
                          required={detail?.address?.Street1 ? detail?.address?.Country !== "PH" ? false : true : true}/>
                        </div>
                      </div>
                      <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                          <MDBCardText className="m-0">Street2:</MDBCardText>
                        </div>
                        <div className="col-md-3">
                          <MDBInput name="street2" disabled={kantry} label={detail?.address?.Street2} 
                          required={detail?.address?.Street2 ? detail?.address?.Country !== "PH" ? false : true : true}/>
                        </div>
                      </div>
                      <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                          <MDBCardText className="m-0">Barangay:</MDBCardText>
                        </div>
                        <div className="col-md-3">
                          <MDBInput name="barangay" disabled={kantry} label={detail?.address?.Barangay} 
                          required={detail?.address?.Barangay ? detail?.address?.Country !== "PH" ? false : true : true}/>
                        </div>
                      </div>
                      <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                        <MDBCardText className="m-0">City:</MDBCardText>
                        </div>
                        
                        <div className="col-md-3">
                          <MDBInput name="city" disabled={kantry} label={detail?.address?.City} 
                          required={detail?.address?.City ? detail?.address?.Country !== "PH" ? false : true : true}/>
                        </div>
                      </div>
                      <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                          <MDBCardText className="m-0">Province:</MDBCardText>
                        </div>
                        <div className="col-md-3">
                        <MDBInput name="province" disabled={kantry} label={detail?.address?.Province} 
                        required={detail?.address?.Province ? detail?.address?.Country !== "PH" ? false : true : true}/>
                        <div  className='form-text'>
                          Province name (ex. Metro Manila)
                        </div>
                        </div>
                      </div>
                      
                    </MDBCol>
                  </div>
                  <div>
                    <MDBTypography tag={'h4'}>Account Details</MDBTypography>
                    <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                          <MDBCardText className="m-0">Payment Method:</MDBCardText>
                        </div>
                        <div className="col-md-3">
                          <select id="bankSelect" name="bank" disabled={edit} onChange={(e) => handlepaymethod(e.target.value)} required={detail?.paymentmethod ? false : true}>
                            {/* Use map to generate options dynamically */}
                            <option selected disabled>{detail?.paymentmethod}</option>
                            {list.map((bank, index) => (
                              <option key={index} value={bank.accountType}>{`${bank.name} - (${bank.accountType})`}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="row d-flex align-items-center my-1">
                        <div className="col-md-2">
                          <MDBCardText className="m-0">Account/Mobile/Wallet Address:</MDBCardText>
                        </div>
                        <div className="col-md-3">
                          <MDBInput name="paymentdetail" disabled={edit} label={detail?.paymentdetail} required={detail?.paymentdetail ? false : true}/>
                        </div>
                      </div>  
                  </div>
                  <div className="d-flex justify-content-end">
                    <MDBBtn type="button" className="mx-2" onClick={() =>setEdit(!edit)}>Edit</MDBBtn>
                    <MDBBtn type="submit" className="mx-2" disabled={edit}>Save</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
    </MDBContainer>
    
 )
}

export default PlayerPaymentDetails;