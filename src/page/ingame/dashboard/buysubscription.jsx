import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBTypography, MDBCardImage,MDBCardText,MDBCardFooter, MDBBtn, MDBSpinner, } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import rubyicon from "../../../assets/subscription/ruby badge.png"
import pearlicon from "../../../assets/subscription/pearl badge.png"
import emeraldicon from "../../../assets/subscription/emerald.png"
import diamondicon from "../../../assets/subscription/diamond.png"
import Swal from "sweetalert2";
import { getsubsamount } from "../../../component/Utils/Subscription";
const BuySubscription = () => {
    const [mysubs, setMySubs] = useState("")
    const [isloading, setIsLoading] = useState(false)
    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}playerdetails/mysubs`, {
        method: "GET",
        credentials: 'include',
        headers:{
            "Content-Type": 'application/json'
        }
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

            setMySubs(data.data)
        })

    },[])

    const Pearlplus = getsubsamount("Pearlplus")
    const Ruby = getsubsamount("Ruby")
    const Emerald = getsubsamount("Emerald")
    const Diamond = getsubsamount("Diamond")

    const discount = getsubsamount(mysubs)

    let buypearplus = false
    let buyruby = false 
    let buyemerald = false 
    let buydiamond = false

    switch(mysubs){
        case "Pearlplus":
            buypearplus = true
            buyruby = false 
            buyemerald = false
            buydiamond = false
            break;
        case "Ruby":
            buypearplus = true
            buyruby = true 
            buyemerald = false
            buydiamond = false
            break;
        case "Emerald":
            buypearplus = true
            buyruby = true 
            buyemerald = true
            buydiamond = false
            break;
        case "Diamond":
            buypearplus = true
            buyruby = true 
            buyemerald = true
            buydiamond = true
            break;
        default:
            buypearplus = false
            buyruby = false 
            buyemerald = false
            buydiamond = false
            break;
    }

    const handleBuySubscription = (e, substype) => {
        e.preventDefault(e);
        setIsLoading(true)
        Swal.fire({
            title: "Are you sure your want to buy this subscription?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}gamewallet/buysubscription`, {
                    method: "POST",
                    credentials: 'include',
                    headers:{
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        substype: substype
                    })
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
                        setIsLoading(false)
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

                    if(data.message == "success"){
                        setIsLoading(false)
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Buy subscription successfully",
                            allowEscapeKey: false,
                            allowOutsideClick: false
                        }).then(ok => {
                            if(ok.isConfirmed){
                                window.location.reload()
                            }
                        })
                    } else {
                        setIsLoading(false)
                        Swal.fire({
                            icon: "warning",
                            title: "Oops...",
                            text: data.message,
                        })
                    }
                })
            } else {
                setIsLoading(false)
            }
        });
    }

    return(
        <MDBContainer>
        <MDBRow className="">

        <MDBCard className="mt-5 px-0">
            <MDBCardHeader style={{background: "#8D5513", color: "white"}}>Select Subscription</MDBCardHeader>
            <MDBCardBody>
            <MDBRow >
                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>Pearl Plus</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0 d-flex align-items-center justify-content-center">
                    <MDBCardImage src={pearlicon} className=""/>
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                { buypearplus ? 
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buypearplus ? `Owned` : `${Pearlplus - discount}`}
                </span>
                : 
                <>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buypearplus ? `Owned` : `${Pearlplus - discount}`}
                </span>
                <MDBBtn 
                disabled={isloading}
                className="mx-2" 
                onClick={(e) => handleBuySubscription(e,"Pearlplus")}
                size="sm">
                {isloading ? <MDBSpinner grow size="sm"/>: "Buy"}
                </MDBBtn>
                </>
                }
                
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>

                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>Ruby Subscription</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0 d-flex align-items-center justify-content-center">
                    <MDBCardImage src={rubyicon} className=""/>
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                { buyruby ? 
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buyruby ? `Owned` : `${Ruby - discount}`}
                </span>
                : 
                <>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buyruby ? `Owned` : `${Ruby - discount}`}
                </span>

                <MDBBtn 
                disabled={isloading}
                className="mx-2" 
                onClick={(e) => handleBuySubscription(e,"Ruby")}
                size="sm">
                {isloading ? <MDBSpinner grow size="sm"/>: "Buy"}
                </MDBBtn>
                </>
                }

                
                
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>

                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>Emerald Subscription</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0 d-flex align-items-center justify-content-center">
                    <MDBCardImage src={emeraldicon} className=""/>
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>

                { buyemerald ? 

                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buyemerald ? `Owned` : `${Emerald - discount}`}
                </span>
                : 
                <>
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buyemerald ? `Owned` : `${Emerald - discount}`}
                </span>
                <MDBBtn 
                disabled={isloading}
                className="mx-2" 
                onClick={(e) => handleBuySubscription(e,"Emerald")}
                size="sm">{isloading ? <MDBSpinner grow size="sm"/>: "Buy"}</MDBBtn>
                </>
                }

                
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>


                <MDBCol className="my-2">
                <MDBCard alignment="center" >
                <MDBCardHeader className="fw-bold" style={{background: "#FADDBF"}}>Diamond Subscription</MDBCardHeader>
                <MDBCardBody className="bundlesbdy p-0 d-flex align-items-center justify-content-center">
                    <MDBCardImage src={diamondicon} className=""/>
                </MDBCardBody>
                <MDBCardFooter className="d-flex justify-content-end align-items-center" style={{background: "#FADDBF"}}>
                { buydiamond ? 
                <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buydiamond ? `Owned` : `${Diamond - discount}`}
                </span>
                 : 
                 <>
                 <span className="fw-bold" style={{fontSize: "1.5rem"}}>
                { buydiamond ? `Owned` : `${Diamond - discount}`}
                </span>
                <MDBBtn 
                disabled={isloading}
                onClick={(e) => handleBuySubscription(e,"Diamond")} 
                className="mx-2" 
                size="sm">{isloading ? <MDBSpinner grow size="sm"/>: "Buy"}</MDBBtn>
                 </>
                 }

                
                </MDBCardFooter>
                </MDBCard>
                </MDBCol>
            </MDBRow>
            
            </MDBCardBody>
        </MDBCard>

        </MDBRow>

        </MDBContainer>
    )
}

export default BuySubscription;